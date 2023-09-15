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
		<section className="grid gap-3 px-6 sm:grid-cols-3 sm:px-36">
			<div className="sm:col-span-1">
				<ProductListItemImage src={product.image.src} alt={product.name} />
			</div>
			<div className="mx-5 sm:col-span-2">
				<SingleProductDescription product={product} />
				<AddToCart />
			</div>
		</section>
	);
};
