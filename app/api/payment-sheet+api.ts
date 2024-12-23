import { stripe } from "@/stripe-server";


export async function POST(req: Request) {
  // Use an existing Customer ID if this is a returning customer.
  const {amount} = await req.json()
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
      {
    customer: customer.id,
  }, {
        apiVersion: "2024-06-20",
      });
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount ? Math.floor(amount * 100) : 10000,
    currency: 'usd',
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return Response.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  });
}
