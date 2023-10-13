import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Order } from "@/app/api/order";
import { OrderProductList } from "@/components/molecules/OrderProductList";
import { formatPrice } from "@/utils";

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

	if (!orders || orders.length === 0) {
		return <div>No orders found</div>;
	}

	console.log(orders);

	return (
		<main className="flex min-h-screen flex-col items-center py-6">
			<section className="flex w-full items-center justify-start border-t-4 border-amber-600">
				<h1 className="rounded-br-md bg-amber-600 px-6 py-1 text-2xl text-neutral-100 sm:px-36">
					{user.firstName?.toUpperCase()}&rsquo;S ORDERS
				</h1>
			</section>
			<ul className="mx-auto my-6 flex w-full max-w-3xl flex-col gap-5 py-6">
				{orders.map((order) => (
					<>
						<li className="border-b-2 text-lg ">
							Order: <span className="font-semibold text-amber-600">{order.id}</span>
						</li>
						<OrderProductList key={order.id} order={order} />
						<li className="mb-6 self-end bg-neutral-200 px-6 py-2">
							<div className="text-xl">
								Total: <span className="font-semibold">{formatPrice(order.total / 100)}</span>
							</div>
						</li>
					</>
				))}
			</ul>
		</main>
	);
}
