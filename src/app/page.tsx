import NextImage from "next/image";
import { getCollections } from "@/app/api/getCollectionsList";
import { getProductsList } from "@/app/api/getProductsList";
import { ProductList } from "@/components/organisms/ProductList";
import { ActiveLink } from "@/components/atoms/ActiveLink";

export default async function Home() {
	const collections = await getCollections();

	/*Products for TEST*/
	const productsWithPagination = await getProductsList(10, 0, undefined);
	const products = productsWithPagination.products.map((v) => v.node);

	return (
		<>
			<main className="flex min-h-screen flex-col items-center p-12">
				<h1>Home</h1>
				<section>
					<ul className="grid grid-cols-3 gap-3">
						{collections.map((value) => (
							<li key={value.id}>
								<ActiveLink href={`/collections/${value.slug}`} exact>
									<NextImage
										src={value.image.url}
										alt={value.image.fileName}
										height={400}
										width={400}
									/>
									{value.name}
								</ActiveLink>
							</li>
						))}
					</ul>
				</section>
				<ProductList products={products} />
			</main>
		</>
	);
}
