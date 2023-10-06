import { notFound } from "next/navigation";
import { Suspense } from "react";
import { type Metadata } from "next";
import { getProductById } from "@/app/api/getProductItem";
import { SingleProduct } from "@/components/organisms/SingleProduct";
import { getProductReview } from "@/app/api/review";
import { Loading } from "@/components/atoms/Loading";
import { SingleProductReview } from "@/components/organisms/SingleProductReview";
import { SuggestedProductList } from "@/components/organisms/SuggestedProductList";
import { getRelatedProductsList } from "@/app/api/getRelatedProductsList";

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
	const relatedProducts = await getRelatedProductsList(product.name);

	return (
		<main className="min-h-screen">
			<SingleProduct product={product} />
			{relatedProducts && (
				<figure data-testid="related-products">
					<Suspense fallback={<Loading />}>
						<SuggestedProductList products={relatedProducts} />
					</Suspense>
				</figure>
			)}
			<Suspense fallback={<Loading />}>
				<SingleProductReview productId={params.productId} reviews={reviews} />
			</Suspense>
		</main>
	);
}
