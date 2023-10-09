import { type SingleProductItemFragment } from "@/gql/graphql";
import { addOrUpdateProductToCart, getCartByIdFromCookie } from "@/app/api/cart";
import { SubmitButton } from "@/components/atoms/SubmitButton";

type AddToCartProps = {
	product: SingleProductItemFragment;
};

export const AddToCart = ({ product }: AddToCartProps) => {
	async function addProductToCartAction() {
		"use server";
		const cart = await getCartByIdFromCookie();
		await addOrUpdateProductToCart(product.id, product.price, cart);
	}

	return (
		<div className="mt-10 flex items-center">
			<form action={addProductToCartAction}>
				<SubmitButton label={"ADD TO CART"} />
			</form>
		</div>
	);
};
