import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Order } from "@/app/api/order";

export default async function OrdersPage() {
	const user = await currentUser();
	if (!user) {
		redirect("/sign-in");
	}

	const email = user.emailAddresses[0]?.emailAddress;
	if (!email) {
		return <div>User does not have email</div>;
	}

	const { orders } = await Order(email);

	if (!orders || orders.length === 0) {
		return <div>No orders found</div>;
	}

	return (
		<div>
			<h1>{user.firstName}&rsquo;s Orders</h1>
			{JSON.stringify(orders)}
		</div>
	);
}
