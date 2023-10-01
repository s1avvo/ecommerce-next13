import { getCartByIdFromCookie } from "@/api/cart";
import { CartModalButton } from "@/components/atoms/CartModalButton";
import { CartModal } from "@/components/atoms/CartModal";

export default async function CartModalPage() {
	const cart = await getCartByIdFromCookie();
	return (
		<CartModal>
			<ul>
				{cart?.orderItems.map((item) => <li key={item.id}>{item.product?.name}</li>)}
				<li>
					<CartModalButton label={"DETAILS"} />
				</li>
			</ul>
		</CartModal>
	);
}
