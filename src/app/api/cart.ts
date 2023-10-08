import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { executeGraphql } from "@/app/api/graphqlApi";
import {
	CartCreateOrderDocument,
	CartGetByIdDocument,
	CartUpsertProductDocument,
} from "@/gql/graphql";

export const getOrCreateCart = async () => {
	const cart = await getCartByIdFromCookie();
	if (cart) {
		return cart;
	}

	const { createOrder: newCart } = await executeGraphql({
		query: CartCreateOrderDocument,
		variables: {},
		cache: "no-store",
	});
	if (!newCart) {
		throw new Error("Failed to create cart");
	}

	cookies().set("cartId", newCart.id, {
		httpOnly: true,
		sameSite: "lax",
		// secure: true
	});

	return newCart;
};

export const getCartByIdFromCookie = async () => {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const { order: cart } = await executeGraphql({
			query: CartGetByIdDocument,
			variables: { id: cartId },
			cache: "no-store",
			next: { tags: ["cart"] },
		});

		if (cart) {
			return cart;
		}
	}
};

export const addOrUpdateProductToCart = async (
	cartId: string,
	productId: string,
	orderItemId: string | undefined,
	quantity: number,
	total: number,
) => {
	/* poprzednia wersja

	const cart = await getCartByIdFromCookie();

	const { product } = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: { id: productId },
	});
	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}

	await executeGraphql({
		query: CartAddProductDocument,
		variables: {
			cartId,
			productId,
			total: product.price,
		},
	}); */

	await executeGraphql({
		query: CartUpsertProductDocument,
		variables: {
			cartId,
			productId,
			orderItemId,
			quantity,
			total,
			hash: crypto.randomUUID(),
		},
		cache: "no-store",
	});

	revalidateTag("cart");
};
