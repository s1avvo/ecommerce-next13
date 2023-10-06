import { type SingleProductItemFragment } from "@/gql/graphql";
import { formatPrice } from "@/utils";

type SingleProductDetailsProps = {
	product: SingleProductItemFragment;
};

export const SingleProductDescription = ({
	product: { name, price, categories, description, averageRating },
}: SingleProductDetailsProps) => {
	return (
		<>
			<h1>{name}</h1>
			<h2>{formatPrice(price / 100)}</h2>
			<p className="mt-5">{description}</p>
			<p className="mt-5 font-semibold">Category: {categories[0]?.name}</p>
			<p className="mt-5 font-semibold">Rating: {averageRating}</p>
		</>
	);
};
