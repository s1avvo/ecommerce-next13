import Stripe from "stripe";
import { addStripeCheckoutId } from "@/app/api/ordet";

export default async function CartSuccess({
	searchParams,
}: {
	searchParams: { session_id: string };
}) {
	if (!process.env.STRIPE_SECRET_KEY) {
		return null;
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-08-16",
		typescript: true,
	});

	const stripeCheckoutSession = await stripe.checkout.sessions.retrieve(searchParams.session_id);

	if (stripeCheckoutSession.metadata?.cartId) {
		await addStripeCheckoutId(stripeCheckoutSession.metadata.cartId, stripeCheckoutSession.id);
	}

	return <div>{stripeCheckoutSession.payment_status}</div>;
}
