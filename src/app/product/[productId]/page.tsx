import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { getProductsSuggestedList } from "@/api/getProductsList";
import { getProductById } from "@/api/getProductItem";
import { SingleProduct } from "@/components/organisms/SingleProduct";
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

	if (!product) {
		return notFound();
	}

	const suggestedProducts = product.categories[0]
		? await getProductsSuggestedList(product.categories[0].name)
		: null;

	return (
		<>
			<SingleProduct product={product} />
			{suggestedProducts && (
				<aside className="my-6 w-full px-6 sm:px-36" data-testid="related-products">
					<h2 className="border-b-2 text-2xl font-semibold">Related Products</h2>
					<Suspense fallback={"Loading..."}>
						<SuggestedProductList products={suggestedProducts} />
					</Suspense>
				</aside>
			)}
		</>
	);
}
