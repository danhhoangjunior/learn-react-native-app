import { router } from "expo-router";
import CheckoutButton from "./checkout-button";

async function openPaymentModal(amount  : number): Promise<void> {
    const { url } = await fetch("/api/hosted-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            custom_donation: amount.toString(),
        },
    }).then((res) => res.json());

    router.push(url);
}

export default function CheckoutForm({amount  } : {amount: number}) {
    return <CheckoutButton onPress={() => openPaymentModal(amount)} title="Checkout" />;
}
