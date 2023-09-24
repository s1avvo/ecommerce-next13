import Link from "next/link";
import { ProductListItemDescription } from "@/components/atoms/ProductListItemDescription";
import { ProductListItemImage } from "@/components/atoms/ProductListItemImage";
import { type ProductListItemFragment } from "@/gql/graphql";

type ProductListItemProps = {
	product: ProductListItemFragment;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<li>
			<Link href={`/product/${product.id}`}>
				<article>
					{product.images[0] && (
						<ProductListItemImage src={product.images[0].url} alt={product.name} />
					)}
					{/* można zapisać krócej przez destrukturyzacje: {...product.image} */}
					<ProductListItemDescription product={product} />
				</article>
			</Link>
		</li>
	);
};
