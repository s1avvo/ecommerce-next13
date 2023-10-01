import { notFound } from "next/navigation";
import { type Route } from "next";
import { type ProductOrderByInput } from "@/gql/graphql";
import { Pagination } from "@/components/organisms/Pagination";
import { getProductsCount, getProductsList } from "@/api/getProductsList";
import { ProductList } from "@/components/organisms/ProductList";
import { SortSelect } from "@/components/atoms/SortSelect";

const LIMIT = 4;

type ProductsPageProps = {
	params: {
		pageNumber: string;
	};
	searchParams: {
		sort: ProductOrderByInput;
	};
};

export const generateStaticParams = async () => {
	const productsCount = await getProductsCount();
	const pages = Math.ceil(productsCount / LIMIT);

	return Array.from({ length: pages }, (_, index) => ({
		pagination: `${index + 1}`,
	}));
};

export default async function ProductsPage({ params, searchParams }: ProductsPageProps) {
	const { pageNumber = "1" } = params;
	const { sort } = searchParams;

	const currentPage = Number(pageNumber);
	const offset = (currentPage - 1) * LIMIT;

	const productsPagination = await getProductsList(LIMIT, offset, sort);
	if (!productsPagination || productsPagination.products.length === 0) {
		return notFound();
	}
	const products = productsPagination.products.map((v) => v.node);
	const productsCount = await getProductsCount();

	return (
		/*className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"*/
		<section className="flex min-h-screen flex-col items-center p-12">
			<SortSelect />
			<ProductList products={products} />
			<Pagination
				limit={LIMIT}
				currentPage={currentPage}
				productsCount={productsCount}
				href={"/products" as Route}
				pageInfo={productsPagination.pageInfo}
			/>
		</section>
	);
}
