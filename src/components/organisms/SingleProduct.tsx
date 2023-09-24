import React from "react";
import { type SingleProductItemFragment } from "@/gql/graphql";
import { AddToCart } from "@/components/atoms/AddToCart";
import { ProductListItemImage } from "@/components/atoms/ProductListItemImage";
import { SingleProductDescription } from "@/components/atoms/SingleProductDescription";
import { SingleProductVariantsList } from "@/components/molecules/SingleProductVariantsList";

type SingleProductItemProps = {
	product: SingleProductItemFragment;
};
export const SingleProduct = async ({ product }: SingleProductItemProps) => {
	return (
		<section className="grid gap-3 px-6 py-6 sm:grid-cols-3 sm:px-36">
			<div className="max-h-96 sm:col-span-1">
				{product.images[0] && (
					<ProductListItemImage src={product.images[0].url} alt={product.images[0].fileName} />
				)}
			</div>
			<article className="prose mx-5 sm:col-span-2">
				<SingleProductDescription product={product} />
				<SingleProductVariantsList product={product} />
				<AddToCart />
			</article>
		</section>
	);
};
