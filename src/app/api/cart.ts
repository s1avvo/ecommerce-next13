import { cookies } from "next/headers";
// import { revalidateTag } from "next/cache";
import { executeGraphql } from "@/app/api/graphqlApi";
import {
	CartCreatAndAddProductDocument,
	CartGetByIdDocument,
	CartUpsertProductDocument,
} from "@/gql/graphql";

export const getCartByIdFromCookie = async () => {
	const cartId = cookies().get("cartId")?.value;
	if (!cartId) return null;

	const { order: cart } = await executeGraphql({
		query: CartGetByIdDocument,
		variables: { id: cartId },
		// cache: "no-store",
		next: { tags: ["cart"] },
	});

	return cart;
};

export const createCartAndAddProduct = async (productId: string, total: number) => {
	const { createOrder: newCart } = await executeGraphql({
		query: CartCreatAndAddProductDocument,
		variables: { productId, total },
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

export const addOrUpdateProductToCart = async (productId: string, total: number) => {
	const cart = await getCartByIdFromCookie();
	if (!cart) {
		await createCartAndAddProduct(productId, total);
		return;
	}

	const orderItem = cart?.orderItems?.find((item) => item?.product?.id === productId);

	await executeGraphql({
		query: CartUpsertProductDocument,
		variables: {
			cartId: cart.id,
			productId,
			orderItemId: orderItem ? orderItem.id : undefined,
			quantity: orderItem ? orderItem.quantity + 1 : 1,
			total: orderItem ? total * (orderItem.quantity + 1) : total,
		},
		// cache: "no-store",
	});

	// revalidateTag("cart");
};
