import {
	ProductGetByIdDocument,
	ProductGetVariantsListDocument,
	type ProductListItemFragment,
} from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";

export const getProductById = async (id: ProductListItemFragment["id"]) => {
	const graphqlResponse = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: {
			id: id,
		},
	});

	return graphqlResponse.product;
};

export const getProductVariants = async (id: ProductListItemFragment["id"]) => {
	const graphqlResponse = await executeGraphql({
		query: ProductGetVariantsListDocument,
		variables: {
			id: id,
		},
	});

	return graphqlResponse.product?.variants;
};
