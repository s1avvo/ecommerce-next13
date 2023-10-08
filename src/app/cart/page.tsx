// import { redirect } from "next/navigation";
import { getCartByIdFromCookie } from "@/app/api/cart";
import { Cart } from "@/components/organisms/Cart";

export default async function CartPage() {
	const cart = await getCartByIdFromCookie();

	// if (!cart || cart.orderItems.length === 0) {
	// 	redirect("/");
	// }

	return (
		<main className="min-h-screen">
			<Cart cart={cart!} />
		</main>
	);
}
