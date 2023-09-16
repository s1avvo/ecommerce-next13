import React, { Suspense } from "react";
import { type Metadata } from "next";
import { getProductById } from "@/api/getProductsList";
import { SingleProduct } from "@/components/organisms/SingleProduct";
import { SuggestedProductList } from "@/components/organisms/SuggestedProductList";

type ProductProps = {
	params: {
		productId: string;
	};
};
export const generateMetadata = async ({ params }: ProductProps): Promise<Metadata> => {
	const product = await getProductById(params.productId);

	return {
		title: product.name,
		description: product.description,
	};
};

export default async function Product({ params }: ProductProps) {
	const product = await getProductById(params.productId);

	return (
		<>
			<SingleProduct product={product} />
			<aside>
				<div className="my-5 mt-5 w-full px-6 sm:px-36">
					<h3 className="text-2xl">Related Products</h3>
					<Suspense fallback={"Loading..."}>
						<SuggestedProductList />
					</Suspense>
				</div>
			</aside>
		</>
	);
}
