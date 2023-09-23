import {
	type SingleProductColorVariantFragment,
	type SingleProductSizeColorVariantFragment,
	type SingleProductSizeVariantFragment,
} from "@/gql/graphql";
import { SelectVariantsColor } from "@/components/atoms/SelectVariantsColor";
import { SelectVariantsSize } from "@/components/atoms/SelectVariantsSize";
import { SelectVariantsSizeAndColor } from "@/components/atoms/SelectVariantsSizeAndColor";

type SingleProductVariantProps = {
	color?: SingleProductColorVariantFragment[];
	size?: SingleProductSizeVariantFragment[];
	sizeAndColor?: SingleProductSizeColorVariantFragment[];
};

export const SingleProductVariant = ({ color, size, sizeAndColor }: SingleProductVariantProps) => {
	return (
		<div className="flex">
			{color && color[0] && <SelectVariantsColor color={color} />}
			{size && size[0] && <SelectVariantsSize size={size} />}
			{sizeAndColor && sizeAndColor[0] && (
				<SelectVariantsSizeAndColor sizeAndColor={sizeAndColor} />
			)}
		</div>
	);
};
