import { type Metadata, type Route } from "next";
import { notFound } from "next/navigation";
import { Pagination } from "@/components/organisms/Pagination";
import {
	getProductsCountInCategory,
	getProductsListByCategorySlug,
} from "@/app/api/getProductsList";
import { ProductList } from "@/components/organisms/ProductList";
import { getCategoriesBySlug } from "@/app/api/getCategoriesList";

const LIMIT = 4;

type ProductsCategoryPageProps = {
	params: {
		pageNumber: string;
		categoryName: string;
	};
};

export const generateStaticParams = async ({ params }: ProductsCategoryPageProps) => {
	const productsCount = await getProductsCountInCategory(params.categoryName);
	if (productsCount) {
		const pages = Math.ceil(productsCount / LIMIT);

		return Array.from({ length: pages }, (_, index) => ({
			categoryName: params.categoryName,
			pageNumber: `${index + 1}`,
		}));
	}
	return [];
};

export const generateMetadata = async ({
	params,
}: ProductsCategoryPageProps): Promise<Metadata> => {
	const category = await getCategoriesBySlug(params.categoryName);

	return {
		title: category?.name,
	};
};

export default async function ProductsCategoryPage({ params }: ProductsCategoryPageProps) {
	const { pageNumber = "1", categoryName } = params;

	const currentPage = Number(pageNumber);
	const offset = (currentPage - 1) * LIMIT;

	const productsPagination = await getProductsListByCategorySlug(categoryName, LIMIT, offset);
	if (!productsPagination || productsPagination.products.length === 0) {
		return notFound();
	}

	const products = productsPagination.products.map((v) => v.node);
	const productsCount = await getProductsCountInCategory(categoryName);
	const category = await getCategoriesBySlug(categoryName);

	return (
		<section className="flex w-full flex-col">
			<div className="flex h-24 w-full flex-row items-center justify-between border-t-4 border-amber-600 bg-neutral-100">
				<h1 className="px-6 py-1 text-2xl text-amber-600 sm:px-36">{category?.name}</h1>
			</div>
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
