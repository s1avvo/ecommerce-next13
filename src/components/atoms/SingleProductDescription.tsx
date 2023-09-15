import React from "react";
import { type ProductListItemType } from "@/components/types";
import { formatPrice } from "@/utils";

type SingleProductDetailsProps = {
	product: ProductListItemType;
};

export const SingleProductDescription = ({
	product: { name, price, category, description },
}: SingleProductDetailsProps) => {
	return (
		<div className="space-y-2">
			<h1 className="text-4xl">{name}</h1>
			<h2 className="text-3xl font-extrabold">{formatPrice(price / 100)}</h2>
			<p className="mt-5">{description}</p>
			<p className="mt-5 font-semibold">Category: {category}</p>
		</div>
	);
};
