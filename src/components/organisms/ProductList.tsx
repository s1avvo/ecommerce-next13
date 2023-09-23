import { ProductListItem } from "@/components/molecules/ProductListItem";
import { type ProductListItemFragment } from "@/gql/graphql";

type ProductsListProps = {
	// products: {
	// 	node: ProductListItemFragment;
	// }[];
	products: ProductListItemFragment[];
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
