import { type ProductListItemType } from "@/components/types";
import { formatPrice } from "@/utils";

type SingleProductDetailsProps = {
	product: ProductListItemType;
};

export const SingleProductDescription = ({
	product: { name, price, category, description },
}: SingleProductDetailsProps) => {
	return (
		<>
			<h1>{name}</h1>
			<h3>{formatPrice(price / 100)}</h3>
			<p className="mt-5">{description}</p>
			<p className="mt-5 font-semibold">Category: {category}</p>
		</>
	);
};
