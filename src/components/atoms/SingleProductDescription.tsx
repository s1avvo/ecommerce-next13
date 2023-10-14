import { type SingleProductItemFragment } from "@/gql/graphql";
import { formatPrice } from "@/utils";

type SingleProductDetailsProps = {
	product: SingleProductItemFragment;
};

export const SingleProductDescription = ({
	product: { price, categories, description },
}: SingleProductDetailsProps) => {
	return (
		<>
			<p className="mt-5">
				<span className="font-semibold">Description:</span> {description}
			</p>
			<p className="mt-5 font-semibold">Category: {categories[0]?.name}</p>
			<h2>{formatPrice(price / 100)}</h2>
		</>
	);
};
