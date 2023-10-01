import {
	ProductGetListDocument,
	ProductsGetListByCategorySlagDocument,
	ProductsGetListByCollectionSlagDocument,
	ProductsGetSuggestedListDocument,
	ProductsCountDocument,
	ProductsGetListSearchDocument,
	ProductsCountByCategorySlugDocument,
	type ProductOrderByInput,
} from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";

export const getProductsList = async (
	limit: number,
	offset: number,
	orderBy: ProductOrderByInput | undefined,
) => {
	const graphqlResponse = await executeGraphql({
		query: ProductGetListDocument,
		variables: {
			limit,
			offset,
			orderBy,
		},
	});

	return graphqlResponse.productsConnection;
};

export const getProductsListByCategorySlug = async (
	category: string,
	limit: number,
	offset: number,
) => {
	const graphqlResponse = await executeGraphql({
		query: ProductsGetListByCategorySlagDocument,
		variables: {
			slag: category,
			limit,
			offset,
		},
	});

	return graphqlResponse.productsConnection;
};

export const getProductsListByCollectionSlag = async (collection: string) => {
	const graphqlResponse = await executeGraphql({
		query: ProductsGetListByCollectionSlagDocument,
		variables: {
			slag: collection,
		},
	});

	return graphqlResponse.products;
};

export const getProductsSuggestedList = async (collection: string) => {
	const graphqlResponse = await executeGraphql({
		query: ProductsGetSuggestedListDocument,
		variables: {
			name: collection,
		},
	});

	return graphqlResponse.products;
};

export const getProductsCount = async () => {
	const graphqlResponse = await executeGraphql({ query: ProductsCountDocument, variables: {} });

	return graphqlResponse.productsConnection.aggregate.count;
};

export const getProductsCountInCategory = async (slug: string) => {
	const graphqlResponse = await executeGraphql({
		query: ProductsCountByCategorySlugDocument,
		variables: {
			slug,
		},
	});

	return graphqlResponse.categories[0]?.products.length;
};

export const getSearchProductsList = async (search: string) => {
	const graphqlResponse = await executeGraphql({
		query: ProductsGetListSearchDocument,
		variables: {
			search,
		},
	});

	return graphqlResponse.products;
};
