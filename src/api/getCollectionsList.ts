import { executeGraphql } from "@/api/graphqlApi";
import { CollectionsGetCollectionBySlugDocument, CollectionsGetListDocument } from "@/gql/graphql";

export const getCollections = async () => {
	const graphqlResponse = await executeGraphql(CollectionsGetListDocument, {});

	return graphqlResponse.collections;
};

export const getCollectionsBySlug = async (slug: string) => {
	const graphqlResponse = await executeGraphql(CollectionsGetCollectionBySlugDocument, {
		slug,
	});

	return graphqlResponse.collections[0];
};
