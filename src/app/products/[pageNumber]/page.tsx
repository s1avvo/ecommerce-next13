import { notFound } from "next/navigation";
import { type Route } from "next";
import { type ProductOrderByInput } from "@/gql/graphql";
import { Pagination } from "@/components/organisms/Pagination";
import { getProductsCount, getProductsList } from "@/app/api/getProductsList";
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
		pageNumber: `${index + 1}`,
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
		<section className="flex w-full flex-col">
			<div className="flex h-24 w-full flex-row items-center justify-between border-t-4 border-amber-600 bg-neutral-100">
				<h1 className="px-6 py-1 text-2xl text-amber-600 sm:px-36">ALL PRODUCTS</h1>
				<SortSelect />
			</div>
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
