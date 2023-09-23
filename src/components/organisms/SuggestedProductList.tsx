import { type ProductListItemFragment } from "@/gql/graphql";
import { ProductList } from "@/components/organisms/ProductList";

/*const sleep = async (ms: number) => {
	await new Promise((resolve) => setTimeout(resolve, ms));
};*/
type SuggestedProductListProps = {
	products: ProductListItemFragment[];
};
export const SuggestedProductList = async ({ products }: SuggestedProductListProps) => {
	// await sleep(5000);
	return <ProductList products={products} />;
};
