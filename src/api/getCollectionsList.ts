import { executeGraphql } from "@/api/graphqlApi";
import { CollectionsGetCollectionBySlugDocument, CollectionsGetListDocument } from "@/gql/graphql";

export const getCollections = async () => {
	const graphqlResponse = await executeGraphql({
		query: CollectionsGetListDocument,
		variables: {},
	});

	return graphqlResponse.collections;
};

export const getCollectionsBySlug = async (slug: string) => {
	const graphqlResponse = await executeGraphql({
		query: CollectionsGetCollectionBySlugDocument,
		variables: {
			slug,
		},
	});

	return graphqlResponse.collections[0];
};
