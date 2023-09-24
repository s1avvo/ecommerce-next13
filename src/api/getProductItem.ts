import {
	ProductGetByIdDocument,
	ProductGetColorVariantListDocument,
	ProductGetSizeColorVariantListDocument,
	ProductGetSizeVariantListDocument,
	type ProductListItemFragment,
} from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";

export const getProductById = async (id: ProductListItemFragment["id"]) => {
	const graphqlResponse = await executeGraphql(ProductGetByIdDocument, {
		id: id,
	});

	return graphqlResponse.product;
};

export const getProductColorVariants = async (id: ProductListItemFragment["id"]) => {
	const graphqlResponse = await executeGraphql(ProductGetColorVariantListDocument, {
		id: id,
	});

	return graphqlResponse.product;
};

export const getProductSizeVariants = async (id: ProductListItemFragment["id"]) => {
	const graphqlResponse = await executeGraphql(ProductGetSizeVariantListDocument, {
		id: id,
	});

	return graphqlResponse.product;
};

export const getProductSizeAndColorVariants = async (id: ProductListItemFragment["id"]) => {
	const graphqlResponse = await executeGraphql(ProductGetSizeColorVariantListDocument, {
		id: id,
	});

	return graphqlResponse.product;
};
