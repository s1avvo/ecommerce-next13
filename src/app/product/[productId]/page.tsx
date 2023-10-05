import { notFound } from "next/navigation";
import { Suspense } from "react";
import { type Metadata } from "next";
import { getProductById } from "@/app/api/getProductItem";
import { SingleProduct } from "@/components/organisms/SingleProduct";
import { getProductReview } from "@/app/api/review";
import { Loading } from "@/components/atoms/Loading";
import { SingleProductReview } from "@/components/organisms/SingleProductReview";
import { SuggestedProductList } from "@/components/organisms/SuggestedProductList";
import { searchClient } from "@/app/api/typesenseApi";
import { type ProductListItemFragment } from "@/gql/graphql";

type ProductProps = {
	params: {
		productId: string;
	};
};
export const generateMetadata = async ({ params }: ProductProps): Promise<Metadata> => {
	const product = await getProductById(params.productId);

	return {
		title: product?.name,
		description: product?.description,
	};
};

export default async function Product({ params }: ProductProps) {
	const product = await getProductById(params.productId);

	if (!product) {
		return notFound();
	}

	const reviews = await getProductReview(params.productId);
	const typesenseData = await searchClient
		.collections("productVec")
		.documents()
		.search(
			{
				q: `${product?.name}`,
				query_by: "embedding",
				prefix: false,
				vector_query: "embedding:([], distance_threshold:0.30, k:4)",
			},
			{},
		);

	const relatedProducts = typesenseData.hits?.map(
		(product) => product.document,
	) as ProductListItemFragment[];

	return (
		<main className="min-h-screen">
			<SingleProduct product={product} />
			{relatedProducts && (
				<aside data-testid="related-products">
					<Suspense fallback={<Loading />}>
						<SuggestedProductList products={relatedProducts} />
					</Suspense>
				</aside>
			)}
			<aside>
				<Suspense fallback={<Loading />}>
					<SingleProductReview productId={params.productId} reviews={reviews} />
				</Suspense>
			</aside>
		</main>
	);
}
