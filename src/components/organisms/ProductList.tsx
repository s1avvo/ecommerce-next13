import { type ProductListItemType } from "@/components/types";
import { ProductListItem } from "@/components/molecules/ProductListItem";

type ProductsListProps = {
	products: ProductListItemType[];
};

export const ProductList = ({ products }: ProductsListProps) => {
	return (
		<ul className="grid gap-12 sm:grid-cols-2 md:grid-cols-4" data-testid="products-list">
			{products.map((product) => (
				<ProductListItem key={product.id} product={product} />
			))}
		</ul>
	);
};
