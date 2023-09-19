import {
	ProductGetListDocument,
	ProductsGetListByCategorySlagDocument,
	ProductGetByIdDocument,
	type ProductListItemFragment,
} from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";

export const getProductsList = async () => {
	const graphqlResponse = await executeGraphql(ProductGetListDocument, {});

	return graphqlResponse.products;
};

export const getProductsListByCategorySlug = async (category: string) => {
	const graphqlResponse = await executeGraphql(ProductsGetListByCategorySlagDocument, {
		slag: category,
	});

	return graphqlResponse.products;
};

export const getProductById = async (id: ProductListItemFragment["id"]) => {
	const graphqlResponse = await executeGraphql(ProductGetByIdDocument, {
		id: id,
	});

	return graphqlResponse.product;
};

// export const getProductsListPagination = async (limit: number, offset: number) => {
// 	const res = await fetch(
// 		`https://naszsklep-api.vercel.app/api/products?take=${limit}&&offset=${offset}`,
// 	);
// 	const productsResponse = (await res.json()) as ProductResponseItem[];

// 	return productsResponse.map(productResponseItemToProductListItem);
// };
