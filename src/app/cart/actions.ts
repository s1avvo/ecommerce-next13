"use server";
import { revalidateTag } from "next/cache";
import { executeGraphql } from "@/api/graphqlApi";
import { CartDeleteProductDocument, CartSetProductQuantityDocument } from "@/gql/graphql";

export const changeItemQuantity = async (itemId: string, quantity: number, price: number) => {
	const changeItem = await executeGraphql({
		query: CartSetProductQuantityDocument,
		variables: {
			itemId,
			quantity,
			total: price * quantity,
		},
		// cache: "no-cache",
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
