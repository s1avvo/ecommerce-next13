import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { type Metadata } from "next";
import { getProductById } from "@/app/api/getProductItem";
import { Loading } from "@/components/atoms/Loading";
import { SingleProductReview } from "@/components/organisms/SingleProductReview";
// import { SingleProductSuggestedProduct } from "@/components/organisms/SingleProductSuggestedProduct";
import { SingleProductImage } from "@/components/atoms/SingleProductImage";
import { SingleProductDescription } from "@/components/atoms/SingleProductDescription";
import { SingleProductVariantsList } from "@/components/molecules/SingleProductVariantsList";
import { SubmitButton } from "@/components/atoms/SubmitButton";
import { addProductToCartAction } from "@/app/product/[productId]/actions";

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
		<section className="flex h-full w-full flex-col items-center justify-center">
			<div className="flex h-24 w-full flex-row items-center justify-between border-t-4 border-amber-600 bg-neutral-100">
				<h1 className="px-6 py-1 text-2xl text-amber-600 sm:px-36">{product.name}</h1>
			</div>
			<div className="grid w-full gap-3 px-6 py-6 sm:grid-cols-3 sm:px-36">
				<div className="max-h-96 sm:col-span-1">
					{product.images[0] && (
						<SingleProductImage src={product.images[0].url} alt={product.images[0].fileName} />
					)}
				</div>
				<div className="prose mx-5 flex-col self-center sm:col-span-2">
					<SingleProductDescription product={product} />
					<SingleProductVariantsList product={product} />
					<div className="mt-10 flex items-center">
						<form action={addProductToCartAction}>
							<input type="text" name="productId" value={product.id} hidden readOnly />
							<input type="number" name="productPrice" value={product.price} hidden readOnly />
							<SubmitButton label={"ADD TO CART"} />
						</form>
					</div>
				</div>
			</div>

			<aside className="w-full">
				{/*Typesense cloud suspended*/}

				{/*<div data-testid="related-products">
					<Suspense fallback={<Loading />}>
						<SingleProductSuggestedProduct name={product.name} />
					</Suspense>
				</div>*/}
				<Suspense fallback={<Loading />}>
					<SingleProductReview productId={params.productId} />
				</Suspense>
			</aside>
		</section>
	);
}
