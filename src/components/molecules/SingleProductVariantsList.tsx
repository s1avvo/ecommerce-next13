import { SingleProductVariant } from "@/components/atoms/SingleProductVariant";
import {
	type SingleProductColorVariantFragment,
	type SingleProductItemFragment,
	type SingleProductSizeColorVariantFragment,
	type SingleProductSizeVariantFragment,
} from "@/gql/graphql";
import {
	getProductColorVariants,
	getProductSizeAndColorVariants,
	getProductSizeVariants,
} from "@/api/getProductItem";

type SingleProductVariantsProps = {
	product: SingleProductItemFragment;
};

export const SingleProductVariantsList = async ({ product }: SingleProductVariantsProps) => {
	let availableColors;
	let availableSizes;
	let availableSizeAndColor;

	if (product?.categories[0] && product.categories[0].name === "Accessories") {
		const colors = await getProductColorVariants(product.id);
		const sizes = await getProductSizeVariants(product.id);

		availableColors =
			colors?.variants[0] &&
			(colors.variants.filter(
				(v) => Object.keys(v).length > 0,
			) as SingleProductColorVariantFragment[]);

		availableSizes =
			sizes?.variants[0] &&
			(sizes?.variants.filter(
				(v) => Object.keys(v).length > 0,
			) as SingleProductSizeVariantFragment[]);
	} else {
		const sizeAndColor = await getProductSizeAndColorVariants(product.id);

		availableSizeAndColor =
			sizeAndColor?.variants[0] &&
			(sizeAndColor?.variants.filter(
				(v) => Object.keys(v).length > 0,
			) as SingleProductSizeColorVariantFragment[]);
	}

	return (
		<SingleProductVariant
			size={availableSizes}
			color={availableColors}
			sizeAndColor={availableSizeAndColor}
		/>
	);
};
