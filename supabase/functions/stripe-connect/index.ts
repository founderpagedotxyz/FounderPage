import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  console.log(`[STRIPE-CONNECT] ${step}`, details ? JSON.stringify(details) : '');
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
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !userData.user) throw new Error("User not authenticated");

    const { startupId } = await req.json();
    if (!startupId) throw new Error("startupId is required");

    logStep("User authenticated, startup", { userId: userData.user.id, startupId });

    // Verify user owns this startup
    const { data: startup, error: startupError } = await supabaseClient
      .from("startups")
      .select("id, user_id, name")
      .eq("id", startupId)
      .eq("user_id", userData.user.id)
      .single();

    if (startupError || !startup) {
      throw new Error("Startup not found or you don't have permission");
    }

    logStep("Startup verified", { startupName: startup.name });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Create OAuth link for Stripe Connect Express
    const origin = req.headers.get("origin") || "https://founderpage.xyz";
    
    const accountLink = await stripe.accountLinks.create({
      account: await createOrGetConnectedAccount(stripe, userData.user.email!, startup.name),
      refresh_url: `${origin}/dashboard?stripe_refresh=true&startup=${startupId}`,
      return_url: `${origin}/dashboard?stripe_connected=true&startup=${startupId}`,
      type: "account_onboarding",
    });

    logStep("Account link created", { url: accountLink.url });

    return new Response(JSON.stringify({ url: accountLink.url }), {
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

async function createOrGetConnectedAccount(stripe: Stripe, email: string, businessName: string): Promise<string> {
  // Create a new Express account for Stripe Connect
  const account = await stripe.accounts.create({
    type: "express",
    email: email,
    business_profile: {
      name: businessName,
    },
    capabilities: {
      transfers: { requested: true },
    },
  });

  logStep("Created Stripe Connect account", { accountId: account.id });
  return account.id;
}
