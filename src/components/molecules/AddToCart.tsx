import { type SingleProductItemFragment } from "@/gql/graphql";
import { addOrUpdateProductToCart, getOrCreateCart } from "@/app/api/cart";
import { SubmitButton } from "@/components/atoms/SubmitButton";

type AddToCartProps = {
	product: SingleProductItemFragment;
};

export const AddToCart = ({ product }: AddToCartProps) => {
	async function addProductToCartAction() {
		"use server";

		const cart = await getOrCreateCart();
		const orderItem = cart.orderItems.find((item) =>
			item.product?.id === product.id ? item : undefined,
		);

		await addOrUpdateProductToCart(
			cart.id,
			product.id,
			orderItem ? orderItem.id : undefined,
			orderItem ? orderItem.quantity + 1 : 1,
			orderItem ? product.price * (orderItem.quantity + 1) : product.price,
		);
	}

	return (
		<div className="mt-10 flex items-center">
			<form action={addProductToCartAction}>
				<SubmitButton label={"ADD TO CART"} />
			</form>
		</div>
	);
};
