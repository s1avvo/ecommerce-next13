import { type SingleProductItemFragment } from "@/gql/graphql";
import { addOrUpdateProductToCart, getOrCreateCart } from "@/app/api/cart";

type AddToCartProps = {
	product: SingleProductItemFragment;
};

export const AddToCart = ({ product }: AddToCartProps) => {
	async function addProductToCartAction() {
		"use server";
		console.log("Click");

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
			<form>
				<button
					formAction={addProductToCartAction}
					type="submit"
					className="rounded-md bg-amber-600 px-6 py-3 text-neutral-100"
					data-testid="add-to-cart-button"
				>
					ADD TO CART
				</button>
			</form>
		</div>
	);
};
