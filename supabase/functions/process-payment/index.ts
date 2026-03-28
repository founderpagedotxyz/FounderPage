import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.21.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2023-10-16',
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { paymentMethodId, price, planName } = await req.json()

    // Crear la intención de pago
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price * 100, // Stripe usa centavos
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true, // Cobrar inmediatamente
      description: `Founder Page - ${planName}`,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    })

    return new Response(
      JSON.stringify({ success: true, id: paymentIntent.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error(error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})