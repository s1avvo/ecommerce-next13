import { type SingleProductItemFragment } from "@/gql/graphql";
import { AddToCartCounter } from "@/components/atoms/AddToCartCounter";

type AddToCartProps = {
	product: SingleProductItemFragment;
};

export const AddToCart = ({ product }: AddToCartProps) => {
	async function addProductToCartAction() {
		"use server";
		console.log("addProductToCartAction id:", product.id);
	}

	return (
		<div className="mt-10 flex items-center">
			<AddToCartCounter />
			<form action={addProductToCartAction}>
				<button type="submit" className="ml-5 bg-amber-600 px-6 py-3 text-neutral-100">
					ADD TO CART
				</button>
			</form>
		</div>
	);
};
