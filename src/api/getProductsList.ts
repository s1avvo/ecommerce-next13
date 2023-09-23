import {
	ProductGetListDocument,
	ProductsGetListByCategorySlagDocument,
	ProductsGetListByCollectionSlagDocument,
	ProductsGetSuggestedListDocument,
	ProductsCountDocument,
	ProductsGetListSearchDocument,
} from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";

export const getProductsList = async (limit: number, offset: number) => {
	const graphqlResponse = await executeGraphql(ProductGetListDocument, {
		limit,
		offset,
	});

	return graphqlResponse.productsConnection;
};

export const getProductsListByCategorySlug = async (
	category: string,
	limit: number,
	offset: number,
) => {
	const graphqlResponse = await executeGraphql(ProductsGetListByCategorySlagDocument, {
		slag: category,
		limit,
		offset,
	});

	return graphqlResponse.productsConnection;
};

export const getProductsListByCollectionSlag = async (collection: string) => {
	const graphqlResponse = await executeGraphql(ProductsGetListByCollectionSlagDocument, {
		slag: collection,
	});

	return graphqlResponse.products;
};

export const getProductsSuggestedList = async (collection: string) => {
	const graphqlResponse = await executeGraphql(ProductsGetSuggestedListDocument, {
		name: collection,
	});

	return graphqlResponse.products;
};

export const getProductsCount = async () => {
	const graphqlResponse = await executeGraphql(ProductsCountDocument, {});

	return graphqlResponse.productsConnection.aggregate.count;
};

export const getSearchProductsList = async (search: string) => {
	const graphqlResponse = await executeGraphql(ProductsGetListSearchDocument, {
		search,
	});

	return graphqlResponse.products;
};
