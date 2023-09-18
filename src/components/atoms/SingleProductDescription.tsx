import { type ProductListItemFragment } from "@/gql/graphql";
import { formatPrice } from "@/utils";

type SingleProductDetailsProps = {
	product: ProductListItemFragment;
};

export const SingleProductDescription = ({
	product: { name, price, categories, description },
}: SingleProductDetailsProps) => {
	return (
		<>
			<h1>{name}</h1>
			<h3>{formatPrice(price / 100)}</h3>
			<p className="mt-5">{description}</p>
			<p className="mt-5 font-semibold">Category: {categories[0]?.name}</p>
		</>
	);
};
