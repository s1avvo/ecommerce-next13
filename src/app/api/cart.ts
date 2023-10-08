import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { executeGraphql } from "@/app/api/graphqlApi";
import {
	CartCreateOrderDocument,
	type CartFragment,
	CartGetByIdDocument,
	CartUpsertProductDocument,
} from "@/gql/graphql";

export const getOrCreateCart = async () => {
	const cart = await getCartByIdFromCookie();
	if (cart?.id) {
		return cart;
	} else {
		cookies().delete("cartId");

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
	}
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
	// cartId: string,
	productId: string,
	cart: CartFragment,
	// orderItemId: string | undefined,
	// quantity: number,
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

	const productInCart = cart?.orderItems?.find((item) => item?.product?.id === productId);

	if (!productInCart) {
		revalidateTag("cart");
		await executeGraphql({
			query: CartUpsertProductDocument,
			variables: {
				cartId: cart.id,
				productId,
				orderItemId: undefined,
				quantity: 1,
				total,
			},
			cache: "no-store",
		});
	}

	if (productInCart && productInCart.product) {
		revalidateTag("cart");
		await executeGraphql({
			query: CartUpsertProductDocument,
			variables: {
				cartId: cart.id,
				productId,
				orderItemId: productInCart.id,
				quantity: productInCart.quantity + 1,
				total: total * (productInCart.quantity + 1),
			},
			cache: "no-store",
		});
	}

	// orderItem ? orderItem.id : undefined,
	// orderItem ? orderItem.quantity + 1 : 1,
	// orderItem ? product.price * (orderItem.quantity + 1) : product.price,

	// revalidateTag("cart");
};
