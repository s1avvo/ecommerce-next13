import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { getProductsListByCollectionSlag } from "@/app/api/getProductsList";
import { ProductList } from "@/components/organisms/ProductList";
import { getCollections, getCollectionsBySlug } from "@/app/api/getCollectionsList";

type CollectionPageProps = {
	params: {
		collectionName: string;
	};
};

export const generateStaticParams = async () => {
	const collections = await getCollections();

	return collections.map((collection) => ({
		collectionName: collection.slug,
	}));
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
		<section className="flex w-full flex-col" data-testid="collections">
			<div className="flex h-24 w-full flex-row items-center justify-between border-t-4 border-amber-600 bg-neutral-100">
				<h1 className="px-6 py-1 text-2xl text-amber-600 sm:px-36">{collection?.name}</h1>
			</div>
			<ProductList products={products} />
		</section>
	);
}
