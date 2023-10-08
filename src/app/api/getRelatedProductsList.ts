import { type SearchResponse } from "typesense/lib/Typesense/Documents";
import { type ProductListItemFragment } from "@/gql/graphql";
import { searchClient } from "@/app/api/typesenseApi";

export const getRelatedProductsList = async (name: string) => {
	const typesenseData = (await searchClient
		.collections("products")
		.documents()
		.search(
			{
				q: `${name}`,
				query_by: "embedding",
				vector_query: "embedding:([], distance_threshold:0.30, k:4)",
				// prefix: false,
				// sort_by: "averageRating:desc",
				// per_page: 4,
			},
			{},
		)) as SearchResponse<ProductListItemFragment>;

	return typesenseData.hits ? typesenseData.hits.map((product) => product.document) : [];
};
