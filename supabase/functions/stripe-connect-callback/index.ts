import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  console.log(`[STRIPE-CALLBACK] ${step}`, details ? JSON.stringify(details) : '');
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

    const { startupId, stripeAccountId } = await req.json();
    if (!startupId || !stripeAccountId) {
      throw new Error("startupId and stripeAccountId are required");
    }

    logStep("Processing callback", { startupId, stripeAccountId });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Verify the Stripe account exists and is valid
    const account = await stripe.accounts.retrieve(stripeAccountId);
    logStep("Retrieved Stripe account", { 
      accountId: account.id, 
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled 
    });

    // Update startup with Stripe account ID
    const { error: updateError } = await supabaseClient
      .from("startups")
      .update({
        stripe_account_id: stripeAccountId,
        stripe_connected_at: new Date().toISOString(),
        income_verified: true,
        verification_source: "stripe_connect",
      })
      .eq("id", startupId)
      .eq("user_id", userData.user.id);

    if (updateError) {
      logStep("Error updating startup", { error: updateError });
      throw new Error("Failed to update startup with Stripe info");
    }

    logStep("Startup updated successfully");

    return new Response(JSON.stringify({ 
      success: true,
      accountId: stripeAccountId,
      chargesEnabled: account.charges_enabled 
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
