import { getCartByIdFromCookie } from "@/app/api/cart";
import { CartContinueShoppingButton } from "@/components/atoms/CartContinueShoppingButton";
import { CartProductList } from "@/components/molecules/CartProductList";
import { CartEmpty } from "@/components/molecules/CartEmpty";

export default async function CartPage() {
	const cart = await getCartByIdFromCookie();

	if (!cart || cart.orderItems.length === 0) {
		return <CartEmpty />;
	}

	return (
		<section className="flex w-full flex-col">
			<div className="flex h-24 w-full flex-row items-center justify-between border-t-4 border-amber-600 bg-neutral-100 px-6 py-1 sm:px-36">
				<div className="flex items-center gap-3">
					<h1 className="text-2xl text-amber-600">CART</h1>
					<span className="text-2xl text-amber-600">|</span>
					<p>#{cart.id}</p>
				</div>
				<CartContinueShoppingButton />
			</div>
			<ul className="mx-auto flex w-full max-w-3xl flex-col gap-5 py-6">
				<CartProductList cart={cart} />
			</ul>
		</section>
	);
}
