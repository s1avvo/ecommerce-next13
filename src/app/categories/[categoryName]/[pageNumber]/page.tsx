import { type Metadata, type Route } from "next";
import { notFound } from "next/navigation";
import { Pagination } from "@/components/organisms/Pagination";
import {
	getProductsCountInCategory,
	getProductsListByCategorySlug,
} from "@/app/api/getProductsList";
import { ProductList } from "@/components/organisms/ProductList";
import { getCategoriesBySlug } from "@/app/api/getCategoriesList";
import { SortSelect } from "@/components/atoms/SortSelect";
import { type ProductOrderByInput } from "@/gql/graphql";

const LIMIT = 4;

type ProductsCategoryPageProps = {
	params: {
		pageNumber: string;
		categoryName: string;
	};
	searchParams: {
		sort: ProductOrderByInput;
	};
};

export const generateMetadata = async ({
	params,
}: ProductsCategoryPageProps): Promise<Metadata> => {
	const category = await getCategoriesBySlug(params.categoryName);

	return {
		title: category?.name,
	};
};

export default async function ProductsCategoryPage({
	params,
	searchParams,
}: ProductsCategoryPageProps) {
	const { pageNumber = "1", categoryName } = params;
	const { sort } = searchParams;

	const currentPage = Number(pageNumber);
	const offset = (currentPage - 1) * LIMIT;

	const productsPagination = await getProductsListByCategorySlug(categoryName, LIMIT, offset, sort);
	if (!productsPagination || productsPagination.products.length === 0) {
		return notFound();
	}
	const products = productsPagination.products.map((v) => v.node);
	const productsCount = await getProductsCountInCategory(categoryName);
	const category = await getCategoriesBySlug(categoryName);

	return (
		/*className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"*/
		<section className="flex min-h-screen flex-col items-center p-12">
			<h2>{category?.name}</h2>
			<SortSelect />
			<ProductList products={products} />
			<Pagination
				limit={LIMIT}
				currentPage={currentPage}
				productsCount={productsCount || 0}
				href={`/categories/${categoryName}` as Route}
				pageInfo={productsPagination.pageInfo}
			/>
		</section>
	);
}
