import { executeGraphql } from "@/app/api/graphqlApi";
import { OrdersGetByEmailDocument, OrderUpdateCheckoutStripeIdDocument } from "@/gql/graphql";

export const addStripeCheckoutId = async (id: string, email: string, stripeCheckoutId: string) => {
	const graphqlResponse = await executeGraphql({
		query: OrderUpdateCheckoutStripeIdDocument,
		variables: {
			id,
			stripeCheckoutId,
			email,
		},
		headers: {
			Authorization: `Bearer ${process.env.HYGRAPH_MUTATION_TOKEN}`,
		},
	});

	return graphqlResponse.updateOrder?.id;
};

export const Order = async (email: string) => {
	const graphqlResponse = await executeGraphql({
		query: OrdersGetByEmailDocument,
		variables: {
			email,
		},
		cache: "no-store",
		headers: {
			Authorization: `Bearer ${process.env.HYGRAPH_QUERY_TOKEN}`,
		},
	});

	return graphqlResponse.orders;
};
