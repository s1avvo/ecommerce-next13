import { type ProductListItemFragment } from "@/gql/graphql";
import { formatPrice } from "@/utils";

/* można użyc typu ProdctListType pomimo, że nie używamy wszystko atrybutów */
type ProductListItemDescriptionProps = {
	product: ProductListItemFragment;
};

export const ProductListItemDescription = ({
	product: { name, categories, price },
}: ProductListItemDescriptionProps) => {
	return (
		<div className="mt-1 max-w-[220px]">
			<div>
				<h3 className="text-sm text-gray-900">{name}</h3>
				{categories[0] && <p className="text-sm text-gray-500">{categories[0]?.name}</p>}
			</div>
			<p className="mt-1 text-sm font-semibold text-gray-900">{formatPrice(price / 100)}</p>
		</div>
	);
};
