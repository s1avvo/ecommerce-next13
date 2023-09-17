import React from "react";
import { AddToCart } from "@/components/atoms/AddToCart";
import { type ProductListItemType } from "@/components/types";
import { ProductListItemImage } from "@/components/atoms/ProductListItemImage";
import { SingleProductDescription } from "@/components/atoms/SingleProductDescription";

type SingleProductItemProps = {
	product: ProductListItemType;
};
export const SingleProduct = ({ product }: SingleProductItemProps) => {
	return (
		<section className="grid gap-3 px-6 py-6 sm:grid-cols-3 sm:px-36">
			<div className="max-h-96 sm:col-span-1">
				<ProductListItemImage src={product.image.src} alt={product.name} />
			</div>
			<article className="prose mx-5 sm:col-span-2">
				<SingleProductDescription product={product} />
				<AddToCart />
			</article>
		</section>
	);
};
