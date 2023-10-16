import { type ProductListItemFragment } from "@/gql/graphql";
import { formatPrice } from "@/utils";
import { SingleProductReviewRating } from "@/components/atoms/SingleProductRatingStars";

/* można użyc typu ProdctListType pomimo, że nie używamy wszystko atrybutów */
type ProductListItemDescriptionProps = {
	product: ProductListItemFragment;
};

export const ProductListItemDescription = ({
	product: { name, categories, price, averageRating },
}: ProductListItemDescriptionProps) => {
	return (
		<div className="mt-1 max-w-[220px]">
			<div>
				<h3 className="text-sm text-gray-900">{name}</h3>
				{categories[0] && <p className="text-sm text-gray-500">{categories[0]?.name}</p>}
			</div>
			<div className="flex items-center justify-between">
				<p className="mt-1 text-sm font-semibold text-gray-900" data-testid="product-price">
					{formatPrice(price / 100)}
				</p>
				<div className="mt-1 flex space-x-1">
					<SingleProductReviewRating rating={averageRating || 0} />
				</div>
			</div>
		</div>
	);
};
