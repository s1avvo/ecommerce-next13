import { type SingleProductItemFragment } from "@/gql/graphql";
import { SingleProductVariantsSelect } from "@/components/atoms/SingleProductVariantsSelect";
import { getProductVariants } from "@/api/getProductItem";

type SingleProductVariantsProps = {
	product: SingleProductItemFragment;
};

export const SingleProductVariantsList = async ({ product }: SingleProductVariantsProps) => {
	const variants = await getProductVariants(product.id);

	return <SingleProductVariantsSelect variants={variants} />;
};
