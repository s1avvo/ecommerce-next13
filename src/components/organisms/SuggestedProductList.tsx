import { getProductsList } from "@/api/getProductsList";
import { ProductList } from "@/components/organisms/ProductList";

/*const sleep = async (ms: number) => {
	await new Promise((resolve) => setTimeout(resolve, ms));
};*/
export const SuggestedProductList = async () => {
	const products = await getProductsList();
	// await sleep(5000);
	return <ProductList products={products.slice(0, 4)} />;
};
