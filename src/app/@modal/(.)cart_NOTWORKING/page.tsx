import { getCartByIdFromCookie } from "@/app/api/cart";
import { CartModal } from "@/components/atoms/CartModal";
import { IncrementProductQuantity } from "@/components/atoms/IncrementProductQuantity";
import { formatPrice } from "@/utils";
import { CartDeleteProductButton } from "@/components/atoms/CartDeleteProductButton";
import { CartPaymentButon } from "@/components/atoms/CartPaymentButton";

export default async function CartModalPage() {
	const cart = await getCartByIdFromCookie();
	if (!cart || cart.orderItems.length === 0) {
		return null;
	}

	const total = cart.orderItems.reduce(
		(acc, item) => (item.product ? acc + item.quantity * item.product.price : 0),
		0,
	);

	return (
		<CartModal>
			<div className="p-6">
				<h1 className="text-3xl">Order</h1>
				<p>#{cart.id}</p>
				<ul className="flex w-full flex-col gap-5 py-6">
					{cart.orderItems.map(
						(item) =>
							item.product && (
								<li key={item.product.id}>
									<article className="grid grid-cols-5 items-center">
										<span className="col-span-3">{item.product.name}</span>
										<div className="col-span-1 self-center">
											<IncrementProductQuantity
												itemId={item.id}
												quantity={item.quantity}
												price={item.product.price}
											/>
										</div>
										<span className="col-span-2 text-center">
											{formatPrice(item.product.price / 100)}
										</span>
										<div className="col-span-1">
											<CartDeleteProductButton itemId={item.id} />
										</div>
									</article>
								</li>
							),
					)}
					<li className="text-end text-2xl">
						Total: <span className="font-semibold">{formatPrice(total / 100)}</span>
					</li>
					<li>
						<CartPaymentButon cart={cart} />
					</li>
				</ul>
			</div>
		</CartModal>
	);
}
