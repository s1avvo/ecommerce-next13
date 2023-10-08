import { type SingleProductItemFragment } from "@/gql/graphql";
import { addOrUpdateProductToCart, getOrCreateCart } from "@/app/api/cart";
import { SingleProductAddToCartButton } from "@/components/atoms/SingleProductAddToCartButton";

type AddToCartProps = {
	product: SingleProductItemFragment;
};

export const AddToCart = ({ product }: AddToCartProps) => {
	async function addProductToCartAction() {
		"use server";

		const cart = await getOrCreateCart();
		await addOrUpdateProductToCart(
			product.id,
			cart,
			product.price,
			// orderItem ? orderItem.id : undefined,
			// orderItem ? orderItem.quantity + 1 : 1,
			// orderItem ? product.price * (orderItem.quantity + 1) : product.price,
		);
	}

	return (
		<div className="mt-10 flex items-center">
			<form action={addProductToCartAction}>
				<SingleProductAddToCartButton />
			</form>
		</div>
	);
};
