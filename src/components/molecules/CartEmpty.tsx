import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { CartContinueShoppingButton } from "@/components/atoms/CartContinueShoppingButton";

export const CartEmpty = () => {
	return (
		<section className="flex h-full w-full flex-col items-center justify-center">
			<div className="flex h-24 w-full flex-row items-center justify-between border-t-4 border-amber-600 bg-neutral-100 px-6 sm:px-36">
				<h1 className="py-1 text-2xl text-amber-600">CART</h1>
			</div>
			<div className="flex h-full flex-col items-center justify-center px-6 sm:px-36">
				<ShoppingCartIcon className="my-6" width={200} />
				<h2 className="mb-3 rounded-t-md border-b-4 border-amber-600 p-3 text-5xl font-semibold">
					YOUR CART IS EMPTY
				</h2>
				<div className="flex items-center">
					<p>Looks like you haven&apos;t added product to cart yet.</p>
					<CartContinueShoppingButton />
				</div>
			</div>
		</section>
	);
};
