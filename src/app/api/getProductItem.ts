import {
	ProductGetByIdDocument,
	ProductGetVariantsListDocument,
	type ProductListItemFragment,
} from "@/gql/graphql";
import { executeGraphql } from "@/app/api/graphqlApi";

export const getProductById = async (id: ProductListItemFragment["id"]) => {
	const graphqlResponse = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: {
			id: id,
		},
		cache: "no-store",
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
