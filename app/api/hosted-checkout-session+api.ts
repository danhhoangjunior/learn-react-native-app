import { stripe } from "@/stripe-server";

const CURRENCY = "usd";

export async function POST(req: Request) {
    const customDonation = Number(req.headers.get("custom_donation"));
    const origin = req.headers.get("origin");
    console.log("origin", origin);
    if (!origin || (!origin.startsWith("http://") && !origin.startsWith("https://"))) {
        return new Response("Invalid origin", { status: 400 });
    }
    const amount = customDonation ? Number(customDonation) : 0;

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: "payment",
        submit_type: "donate",
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: CURRENCY,
                    product_data: {
                        name: "Custom amount donation",
                    },
                    unit_amount: formatAmountForStripe(amount, CURRENCY),
                },
            },
        ],
        success_url: `${origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/cancel`,
        ui_mode: "hosted",
    });

    return Response.json({
        client_secret: checkoutSession.client_secret,
        url: checkoutSession.url,
    });
}

function formatAmountForStripe(amount: number, currency: string): number {
    let numberFormat = new Intl.NumberFormat(["en-US"], {
        style: "currency",
        currency: currency,
        currencyDisplay: "symbol",
    });
    const parts = numberFormat.formatToParts(amount);
    let zeroDecimalCurrency: boolean = true;
    for (let part of parts) {
        if (part.type === "decimal") {
            zeroDecimalCurrency = false;
        }
    }
    return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}
