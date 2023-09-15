import Link from "next/link";
import { ProductListItemDescription } from "@/components/atoms/ProductListItemDescription";
import { ProductListItemImage } from "@/components/atoms/ProductListItemImage";
import { ProductListItemFavorite } from "@/components/atoms/ProductListItemFavorite";
import { type ProductListItemType } from "@/components/types";

type ProductListItemProps = {
	product: ProductListItemType;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<li>
			<Link href={`/product/${product.id}`}>
				<article>
					<div className="relative mx-auto h-[320px] max-w-[220px] p-6">
						<ProductListItemImage src={product.image.src} alt={product.image.alt} />
						<ProductListItemFavorite />
					</div>
					{/* można zapisac krócej przez destrukturyzacje: {...product.image} */}
					<ProductListItemDescription product={product} />
				</article>
			</Link>
		</li>
	);
};
