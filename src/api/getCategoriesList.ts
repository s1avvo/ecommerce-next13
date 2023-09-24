import { executeGraphql } from "@/api/graphqlApi";
import { CategoriesGetByCategorySlugDocument, CategoriesGetListDocument } from "@/gql/graphql";

export const getCategories = async () => {
	const graphqlResponse = await executeGraphql(CategoriesGetListDocument, {});

	return graphqlResponse.categories;
};

export const getCategoriesBySlug = async (slug: string) => {
	const graphqlResponse = await executeGraphql(CategoriesGetByCategorySlugDocument, {
		slug,
	});

	return graphqlResponse.categories[0];
};
