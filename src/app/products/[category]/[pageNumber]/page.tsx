import { notFound } from "next/navigation";
import { ProductList } from "@/components/organisms/ProductList";
import { Pagination } from "@/components/organisms/Pagination";
import { getProductsListByCategorySlug } from "@/api/getProductsList";

type ProductsCategoryPageProps = {
	params: {
		pageNumber: string;
		category: string;
	};
};

export const generateStaticParams = async () => {
	return Array.from({ length: 10 }, (_, index) => ({
		pagination: `${index + 1}`,
	}));
};

export default async function ProductsCategoryPage({ params }: ProductsCategoryPageProps) {
	const { pageNumber = "1", category } = params;

	const total = 100;
	const limit = 10;
	const currentPage = Number(pageNumber);
	// const offset = limit * currentPage - limit;

	const products = await getProductsListByCategorySlug(category);

	if (!products) {
		return notFound();
	}

	return (
		/*className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"*/
		<section className="flex min-h-screen flex-col items-center p-12">
			<ProductList products={products} />
			<Pagination limit={limit} currentPage={currentPage} totalPages={total} />
		</section>
	);
}
