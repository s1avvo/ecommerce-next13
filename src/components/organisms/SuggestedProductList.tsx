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
	return (
		<>
			<div className="px-6 sm:px-36">
				<h2 className="border-b-2 text-2xl font-semibold">Related Products</h2>
			</div>
			<ProductList products={products} />
		</>
	);
};
