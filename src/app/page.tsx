import NextImage from "next/image";
import { getCollections } from "@/app/api/getCollectionsList";
import { getProductsList } from "@/app/api/getProductsList";
import { ProductList } from "@/components/organisms/ProductList";
import { ActiveLink } from "@/components/atoms/ActiveLink";

export default async function Home() {
	const collections = await getCollections();
	const productsWithPagination = await getProductsList(8, 0, "averageRating_DESC");
	const products = productsWithPagination.products.map((v) => v.node);

	return (
		<>
			<section className="flex w-full items-center justify-center border-t-4 border-amber-600 bg-neutral-100 p-6 sm:px-36">
				<ul className="grid w-full gap-x-6 sm:grid-cols-3">
					{collections.map((value) => (
						<li key={value.id}>
							<ActiveLink key={value.id} href={`/collections/${value.slug}`} exact>
								<div className="relative aspect-auto h-72 w-auto">
									<NextImage
										placeholder="blur"
										blurDataURL={`/assets/${value.image.fileName.split("_").at(-1)}`}
										src={value.image.url}
										alt={value.image.fileName}
										quality={75}
										fill
										sizes="(max-width: 440px) 100vw,
											(max-width: 768px) 75vw,
											(max-width: 1060px) 50vw,
											33vw"
										className="object-cover"
									/>
								</div>
								<p className="text-lg">{value.name}</p>
							</ActiveLink>
						</li>
					))}
				</ul>
			</section>
			<aside className="flex w-full flex-col items-center justify-center">
				<h2 className="self-start rounded-br-md bg-amber-600 px-6 py-1 text-2xl text-neutral-100 sm:px-36">
					TOP RATED
				</h2>
				<ProductList products={products} />
			</aside>
		</>
	);
}
