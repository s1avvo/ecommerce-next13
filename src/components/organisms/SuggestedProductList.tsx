import { ProductList } from "@/components/organisms/ProductList";
import { getRelatedProductsList } from "@/app/api/getRelatedProductsList";

// const sleep = async (ms: number) => {
// 	await new Promise((resolve) => setTimeout(resolve, ms));
// };
type SuggestedProductListProps = {
	name: string;
};
export const SuggestedProductList = async ({ name }: SuggestedProductListProps) => {
	// await sleep(3000);
	const relatedProducts = await getRelatedProductsList(name);
	return (
		<>
			<div className="px-6 sm:px-36">
				<h2 className="border-b-2 text-2xl font-semibold">Related Products</h2>
			</div>
			<ProductList products={relatedProducts} />
		</>
	);
};
