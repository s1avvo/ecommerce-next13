import { type ProductListItemType } from "@/components/types";
import { formatPrice } from "@/utils";

/* można użyc typu ProdctListType pomimo, że nie używamy wszystko atrybutów */
type ProductListItemDescriptionProps = {
	product: ProductListItemType;
};

export const ProductListItemDescription = ({
	product: { name, category, price },
}: ProductListItemDescriptionProps) => {
	return (
		<div className="mt-1 max-w-[220px]">
			<div>
				<h3 className="text-sm text-gray-900">{name}</h3>
				<p className="text-sm text-gray-500">{category}</p>
			</div>
			<p className="mt-1 text-sm font-semibold text-gray-900">{formatPrice(price / 100)}</p>
		</div>
	);
};
