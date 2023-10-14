import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Order } from "@/app/api/order";
import { OrderProductList } from "@/components/molecules/OrderProductList";
import { formatPrice } from "@/utils";
import { OrderNoFound } from "@/components/molecules/OrderNoFound";

export default async function OrdersPage() {
	const user = await currentUser();
	if (!user) {
		redirect("/sign-in");
	}

	const email = user.emailAddresses[0]?.emailAddress;
	if (!email) {
		return <div>User does not have email</div>;
	}

	const orders = await Order(email);

	if (!orders) {
		return <OrderNoFound user={user.firstName || ""} />;
	}

	return (
		<section className="flex w-full flex-col">
			<div className="flex h-24 w-full flex-row items-center justify-between border-t-4 border-amber-600 bg-neutral-100">
				<h1 className="px-6 py-1 text-2xl text-amber-600 sm:px-36">
					{user.firstName?.toUpperCase()}&rsquo;S ORDERS
				</h1>
			</div>
			{orders.map((order, index) => (
				<ul key={order.id} className="mx-auto flex w-full max-w-3xl flex-col gap-5 py-6">
					<li key={`order-id-${index}`} className="border-b-2 text-lg ">
						Order: <span className="font-semibold text-amber-600">{order.id}</span>
					</li>
					<OrderProductList order={order} />
					<li key={`total-${index}`} className="mb-6 self-end bg-neutral-200 px-6 py-2">
						<div className="text-xl">
							Total: <span className="font-semibold">{formatPrice(order.total / 100)}</span>
						</div>
					</li>
				</ul>
			))}
		</section>
	);
}
