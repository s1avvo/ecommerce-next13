import NextImage from "next/image";
import { getCollections } from "@/app/api/getCollectionsList";
import { getProductsList } from "@/app/api/getProductsList";
import { ProductList } from "@/components/organisms/ProductList";
import { ActiveLink } from "@/components/atoms/ActiveLink";
import { SuggestedProductList } from "@/components/organisms/SuggestedProductList";

export default async function Home() {
	const collections = await getCollections();

	/*Products for TEST*/
	const productsWithPagination = await getProductsList(8, 0, "averageRating_DESC");
	const products = productsWithPagination.products.map((v) => v.node);

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
				<section className="flex w-full flex-col items-center justify-center">
					<h2 className="self-start rounded-br-md bg-amber-600 px-6 py-1 text-2xl text-neutral-100 sm:px-36">
						TOP RATED
					</h2>
					<ProductList products={products} />
				</section>
			</main>
		</>
	);
}
