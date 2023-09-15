import { getProductsList } from "@/api/getProductsList";
import { ProductList } from "@/components/organisms/ProductList";

/*const sleep = async (ms: number) => {
	await new Promise((resolve) => setTimeout(resolve, ms));
};*/
export const SuggestedProductList = async () => {
	const products = await getProductsList();
	// await sleep(5000);
	return (
		<article className="flex min-h-screen flex-col items-center p-12">
			<ProductList products={products.slice(0, 4)} />;
		</article>
	);
};
