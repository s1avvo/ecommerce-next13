import { CartContinueShoppingButton } from "@/components/atoms/CartContinueShoppingButton";
import { CartProductList } from "@/components/molecules/CartProductList";
import { type CartFragment } from "@/gql/graphql";

type CartProps = {
	cart: CartFragment;
};
export const Cart = ({ cart }: CartProps) => {
	return (
		<section className="px-6 sm:px-36">
			<div className="my-6 flex items-center justify-between border-b-2">
				<div>
					<h1 className="text-3xl">Order</h1>
					<p>#{cart.id}</p>
				</div>
				<CartContinueShoppingButton />
			</div>
			<ul className="flex w-full flex-col gap-5 py-6">
				<CartProductList cart={cart} />
			</ul>
		</section>
	);
};
