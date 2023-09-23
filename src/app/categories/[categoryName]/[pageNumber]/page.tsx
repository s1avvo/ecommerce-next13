import { type Metadata, type Route } from "next";
import { notFound } from "next/navigation";
import { Pagination } from "@/components/organisms/Pagination";
import { getProductsCount, getProductsListByCategorySlug } from "@/api/getProductsList";
import { ProductList } from "@/components/organisms/ProductList";
import { getCategoriesBySlug } from "@/api/getCategoriesList";

const LIMIT = 2;

type ProductsCategoryPageProps = {
	params: {
		pageNumber: string;
		categoryName: string;
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

export const generateStaticParams = async () => {
	return Array.from({ length: 10 }, (_, index) => ({
		pagination: `${index + 1}`,
	}));
};

export default async function ProductsCategoryPage({ params }: ProductsCategoryPageProps) {
	const { pageNumber = "1", categoryName } = params;

	const currentPage = Number(pageNumber);
	const offset = (currentPage - 1) * LIMIT;

	const productsPagination = await getProductsListByCategorySlug(categoryName, LIMIT, offset);
	const totalPages = await getProductsCount();

	if (!productsPagination || productsPagination.products.length === 0) {
		return notFound();
	}

	const products = productsPagination.products.map((v) => v.node);
	const category = await getCategoriesBySlug(params.categoryName);

	return (
		/*className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"*/
		<section className="flex min-h-screen flex-col items-center p-12">
			<h2>{category?.name}</h2>
			<ProductList products={products} />
			<Pagination
				limit={LIMIT}
				currentPage={currentPage}
				totalPages={totalPages}
				href={`/categories/${categoryName}` as Route}
				pageInfo={productsPagination.pageInfo}
			/>
		</section>
	);
}
