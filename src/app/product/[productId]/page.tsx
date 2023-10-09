import { notFound } from "next/navigation";
import { Suspense } from "react";
import { type Metadata } from "next";
import { getProductById } from "@/app/api/getProductItem";
import { SingleProduct } from "@/components/organisms/SingleProduct";
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
		openGraph: {
			title: product?.name,
			description: product?.description,
		},
	};
};

export default async function Product({ params }: ProductProps) {
	const product = await getProductById(params.productId);

	if (!product) {
		return notFound();
	}

	return (
		<main className="min-h-screen">
			<SingleProduct product={product} />

			<aside data-testid="related-products">
				<Suspense fallback={<Loading />}>
					<SuggestedProductList name={product.name} />
					<SingleProductReview productId={params.productId} />
				</Suspense>
			</aside>
		</main>
	);
}
