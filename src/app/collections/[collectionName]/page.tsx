import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { getProductsListByCollectionSlag } from "@/app/api/getProductsList";
import { ProductList } from "@/components/organisms/ProductList";
import { getCollectionsBySlug } from "@/app/api/getCollectionsList";

type CollectionPageProps = {
	params: {
		collectionName: string;
	};
};

export const generateMetadata = async ({ params }: CollectionPageProps): Promise<Metadata> => {
	const collection = await getCollectionsBySlug(params.collectionName);

	return {
		title: collection?.name,
	};
};

export default async function CollectionPage({ params }: CollectionPageProps) {
	const products = await getProductsListByCollectionSlag(params.collectionName);
	const collection = await getCollectionsBySlug(params.collectionName);

	if (products.length === 0) {
		return notFound();
	}

	return (
		/*className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"*/
		<section className="flex min-h-screen flex-col items-center p-12" data-testid="collections">
			<h2>{collection?.name}</h2>
			<ProductList products={products} />
		</section>
	);
}
