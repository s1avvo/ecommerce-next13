import { executeGraphql } from "@/app/api/graphqlApi";
import { OrderUpdateCheckoutStripeIdDocument } from "@/gql/graphql";

export const addStripeCheckoutId = async (id: string, stripeCheckoutId: string) => {
	const graphqlResponse = await executeGraphql({
		query: OrderUpdateCheckoutStripeIdDocument,
		variables: {
			id,
			stripeCheckoutId,
		},
	});

	return graphqlResponse.updateOrder?.id;
};
