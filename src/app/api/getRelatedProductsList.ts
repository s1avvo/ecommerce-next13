import { type SearchResponse } from "typesense/lib/Typesense/Documents";
import { type ProductListItemFragment } from "@/gql/graphql";
import { searchClient } from "@/app/api/typesenseApi";

export const getRelatedProductsList = async (name: string) => {
	const typesenseData = (await searchClient
		.collections("productVec")
		.documents()
		.search(
			{
				q: `${name}`,
				query_by: "embedding",
				prefix: false,
				vector_query: "embedding:([], distance_threshold:0.30, k:4)",
			},
			{},
		)) as SearchResponse<ProductListItemFragment>;

	return typesenseData.hits ? typesenseData.hits.map((product) => product.document) : [];
};
