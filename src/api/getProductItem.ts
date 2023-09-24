import {
	ProductGetByIdDocument,
	ProductGetVariantsListDocument,
	type ProductListItemFragment,
} from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";

export const getProductById = async (id: ProductListItemFragment["id"]) => {
	const graphqlResponse = await executeGraphql(ProductGetByIdDocument, {
		id: id,
	});

	return graphqlResponse.product;
};

export const getProductVariants = async (id: ProductListItemFragment["id"]) => {
	const graphqlResponse = await executeGraphql(ProductGetVariantsListDocument, {
		id: id,
	});

	return graphqlResponse.product?.variants;
};
