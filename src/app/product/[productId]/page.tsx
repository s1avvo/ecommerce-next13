import { notFound } from "next/navigation";
import { Suspense } from "react";
import { type Metadata } from "next";
import { getProductsSuggestedList } from "@/app/api/getProductsList";
import { getProductById } from "@/app/api/getProductItem";
import { SingleProduct } from "@/components/organisms/SingleProduct";
import { getProductReview } from "@/app/api/review";
import { Loading } from "@/components/atoms/Loading";
import { SingleProductReview } from "@/components/organisms/SingleProductReview";
import { SuggestedProductList } from "@/components/organisms/SuggestedProductList";

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
	const reviews = await getProductReview(params.productId);

	if (!product) {
		return notFound();
	}

	const suggestedProducts = product.categories[0]
		? await getProductsSuggestedList(product.categories[0].name)
		: null;

	return (
		<main className="min-h-screen">
			<SingleProduct product={product} />
			{suggestedProducts && (
				<aside data-testid="related-products">
					<Suspense fallback={"Loading..."}>
						<SuggestedProductList products={suggestedProducts} />
					</Suspense>
				</aside>
			)}
			{reviews && (
				<aside>
					<Suspense fallback={<Loading />}>
						<SingleProductReview productId={params.productId} reviews={reviews} />
					</Suspense>
				</aside>
			)}
		</main>
	);
}
