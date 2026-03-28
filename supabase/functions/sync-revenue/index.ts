import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  console.log(`[SYNC-REVENUE] ${step}`, details ? JSON.stringify(details) : '');
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !userData.user) throw new Error("User not authenticated");

    const { startupId } = await req.json();
    if (!startupId) throw new Error("startupId is required");

    logStep("User authenticated", { userId: userData.user.id, startupId });

    // Get startup with Stripe account
    const { data: startup, error: startupError } = await supabaseClient
      .from("startups")
      .select("id, stripe_account_id, user_id")
      .eq("id", startupId)
      .eq("user_id", userData.user.id)
      .single();

    if (startupError || !startup) {
      throw new Error("Startup not found or not owned by user");
    }

    if (!startup.stripe_account_id) {
      throw new Error("Stripe not connected for this startup");
    }

    logStep("Startup found", { stripeAccountId: startup.stripe_account_id });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Get balance transactions for the connected account (last 12 months)
    const now = new Date();
    const monthlyRevenue: Record<string, number> = {};

    // Initialize last 12 months with 0
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyRevenue[key] = 0;
    }

    try {
      // Fetch charges from the connected account
      const charges = await stripe.charges.list({
        limit: 100,
        created: {
          gte: Math.floor(new Date(now.getFullYear(), now.getMonth() - 11, 1).getTime() / 1000),
        },
      }, {
        stripeAccount: startup.stripe_account_id,
      });

      logStep("Fetched charges", { count: charges.data.length });

      // Aggregate by month
      for (const charge of charges.data) {
        if (charge.status === 'succeeded' && charge.paid) {
          const chargeDate = new Date(charge.created * 1000);
          const key = `${chargeDate.getFullYear()}-${String(chargeDate.getMonth() + 1).padStart(2, '0')}`;
          if (monthlyRevenue[key] !== undefined) {
            monthlyRevenue[key] += charge.amount / 100; // Convert from cents
          }
        }
      }
    } catch (stripeError) {
      logStep("Error fetching Stripe data, using balance instead", { error: stripeError });
      
      // Fallback: try to get balance
      try {
        const balance = await stripe.balance.retrieve({
          stripeAccount: startup.stripe_account_id,
        });
        logStep("Retrieved balance", { balance: balance.available });
      } catch (balanceError) {
        logStep("Could not retrieve balance either", { error: balanceError });
      }
    }

    logStep("Monthly revenue calculated", monthlyRevenue);

    // Store revenue history in database
    const revenueEntries = Object.entries(monthlyRevenue).map(([month, revenue]) => ({
      startup_id: startupId,
      month: `${month}-01`, // First day of month
      revenue: Math.round(revenue),
    }));

    // Upsert revenue history
    for (const entry of revenueEntries) {
      const { error: upsertError } = await supabaseClient
        .from("revenue_history")
        .upsert(entry, {
          onConflict: "startup_id,month",
        });
      
      if (upsertError) {
        logStep("Error upserting revenue", { entry, error: upsertError });
      }
    }

    // Calculate current MRR (last complete month)
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthKey = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;
    const currentMRR = monthlyRevenue[lastMonthKey] || 0;

    // Update startup's monthly_income
    await supabaseClient
      .from("startups")
      .update({ monthly_income: Math.round(currentMRR) })
      .eq("id", startupId);

    logStep("Revenue sync complete", { currentMRR });

    return new Response(JSON.stringify({ 
      success: true,
      monthlyRevenue,
      currentMRR: Math.round(currentMRR)
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
