import NextImage from "next/image";
// import { getCollections } from "@/app/api/getCollectionsList";
// import { getProductsList } from "@/app/api/getProductsList";
// import { ProductList } from "@/components/organisms/ProductList";
import { ActiveLink } from "@/components/atoms/ActiveLink";
import { SuggestedProductList } from "@/components/organisms/SuggestedProductList";

const collections = [
	{
		id: "ckdu452ug0gxm0158pysyubmr",
		name: "Summer Vibes",
		slug: "summer-vibes",
		image: {
			url: "https://media.graphassets.com/bSNBSKTTqGcO6idNtJ1k",
			fileName:
				"zaiste_commercial_photography_of_a_summer_hipster_clothes_colle_802ed442-fa00-400f-8df9-8a3e64072c85.png",
		},
	},
	{
		id: "ckdu45fyo0gxx01046eyfmexx",
		name: "New Arrivals",
		slug: "new-arrivals",
		image: {
			url: "https://media.graphassets.com/D9UlYjm9TV69YBmmh6qQ",
			fileName:
				"zaiste_commercial_photography_of_new_arrivals_collection_of_t-s_10b58c8e-2b48-4ea4-bc55-002c3ae999f4.png",
		},
	},
	{
		id: "clja9w1zbag3j0auvowrcoy1p",
		name: "Elegant Extras",
		slug: "elegant-extras",
		image: {
			url: "https://media.graphassets.com/CkerqUahRfqjKNevA2R5",
			fileName:
				"zaiste_commercial_photography_of_accessories_collection_such_as_e068d167-a671-4ca2-8a49-311042d68bd2.png",
		},
	},
];

export default async function Home() {
	// const collections = await getCollections();
	//
	// /*Products for TEST*/
	// const productsWithPagination = await getProductsList(8, 0, "averageRating_DESC");
	// const products = productsWithPagination.products.map((v) => v.node);

	return (
		<>
			<main className="flex min-h-screen flex-col items-center py-6">
				<section className="flex w-full items-center justify-center border-b-4 border-amber-600 bg-neutral-100 py-6">
					<ul className="grid gap-x-6 sm:grid-cols-3">
						{collections.map((value) => (
							<li key={value.id}>
								<ActiveLink href={`/collections/${value.slug}`} exact>
									<NextImage
										src={value.image.url}
										alt={value.image.fileName}
										height={400}
										width={400}
									/>
									<p className="text-lg">{value.name}</p>
								</ActiveLink>
							</li>
						))}
					</ul>
				</section>
				<SuggestedProductList name={"Unisex Zip Hoodie"} />
				{/*<section className="flex w-full flex-col items-center justify-center">*/}
				{/*	<h2 className="self-start rounded-br-md bg-amber-600 px-6 py-1 text-2xl text-neutral-100 sm:px-36">*/}
				{/*		TOP RATED*/}
				{/*	</h2>*/}
				{/*	<ProductList products={products} />*/}
				{/*</section>*/}
			</main>
		</>
	);
}
