import { executeGraphql } from "@/app/api/graphqlApi";
import { CategoriesGetByCategorySlugDocument, CategoriesGetListDocument } from "@/gql/graphql";

export const getCategories = async () => {
	const graphqlResponse = await executeGraphql({ query: CategoriesGetListDocument });

	return graphqlResponse.categories;
};

export const getCategoriesBySlug = async (slug: string) => {
	const graphqlResponse = await executeGraphql({
		query: CategoriesGetByCategorySlugDocument,
		variables: {
			slug,
		},
	});

	return graphqlResponse.categories[0];
};
