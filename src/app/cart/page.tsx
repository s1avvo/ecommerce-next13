import { redirect } from "next/navigation";
import { getCartByIdFromCookie } from "@/api/cart";
import { formatPrice } from "@/utils";
import { IncrementProductQuantity } from "@/components/atoms/IncrementProductQuantity";
import { DeleteProductFromCartButton } from "@/components/atoms/DeleteProductFromCartButton";

export default async function CartPage() {
	const cart = await getCartByIdFromCookie();

	if (!cart || cart.orderItems.length === 0) {
		redirect("/");
	}

	return (
		<div>
			<h1>Order #{cart.id} summary</h1>
			<table>
				<thead>
					<tr>
						<th>Product</th>
						<th>Quantity</th>
						<th>Price</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{cart.orderItems.map(
						(item) =>
							item.product && (
								<tr key={item.product.id}>
									<td>{item.product.name}</td>
									<td>
										<IncrementProductQuantity
											itemId={item.id}
											quantity={item.quantity}
											price={item.product.price}
										/>
									</td>
									<td>{formatPrice(item.product.price / 100)}</td>
									<td>
										<DeleteProductFromCartButton itemId={item.id} />
									</td>
								</tr>
							),
					)}
				</tbody>
			</table>
		</div>
	);
}
