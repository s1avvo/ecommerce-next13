import React from "react";
import { AddToCart } from "@/components/atoms/AddToCart";
import { ProductListItemImage } from "@/components/atoms/ProductListItemImage";
import { SingleProductDescription } from "@/components/atoms/SingleProductDescription";
import { type ProductListItemFragment } from "@/gql/graphql";

type SingleProductItemProps = {
	product: ProductListItemFragment;
};
export const SingleProduct = ({ product }: SingleProductItemProps) => {
	return (
		<section className="grid gap-3 px-6 py-6 sm:grid-cols-3 sm:px-36">
			<div className="max-h-96 sm:col-span-1">
				{product.images[0] && (
					<ProductListItemImage src={product.images[0].url} alt={product.name} />
				)}
			</div>
			<article className="prose mx-5 sm:col-span-2">
				<SingleProductDescription product={product} />
				<AddToCart />
			</article>
		</section>
	);
};
