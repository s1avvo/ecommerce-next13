"use server";
import Stripe from "stripe";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { executeGraphql } from "@/app/api/graphqlApi";
import {
	CartDeleteProductDocument,
	CartSetProductQuantityDocument,
	type CartFragment,
} from "@/gql/graphql";

export const changeItemQuantity = async (itemId: string, quantity: number, price: number) => {
	const changeItem = await executeGraphql({
		query: CartSetProductQuantityDocument,
		variables: {
			itemId,
			quantity,
			total: price * quantity,
			hash: crypto.randomUUID(),
		},
		cache: "no-store",
	});

	revalidateTag("cart");
	return changeItem;
};

export const deleteItem = (itemId: string) => {
	const deleteItem = executeGraphql({
		query: CartDeleteProductDocument,
		variables: {
			itemId,
		},
		// cache: "no-cache",
	});

	revalidateTag("cart");
	return deleteItem;
};

export const paymentAction = async (cart: CartFragment) => {
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing a STRIPE_SECRET_KEY");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-08-16",
		typescript: true,
	});

	// const cart = await getCartByIdFromCookie();
	if (!cart) {
		return;
	}

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		metadata: {
			cartId: cart.id,
		},
		line_items: cart.orderItems.map((item) => ({
			price_data: item.product
				? {
						currency: "usd",
						product_data: {
							name: item.product.name,
							description: item.product.description,
							images: item.product.images.map((i) => i.url),
						},
						unit_amount: item.product.price,
				  }
				: undefined,
			quantity: item.quantity,
		})),
		mode: "payment",
		success_url: `http://localhost:3000/cart/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `http://localhost:3000/cart/canceled`,
	});

	if (session.url) {
		cookies().set("cartId", "");
		redirect(session.url);
	}
};
