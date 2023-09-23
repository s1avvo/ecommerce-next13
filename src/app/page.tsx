import { getCollections } from "@/api/getCollectionsList";
import { getProductsList } from "@/api/getProductsList";
import { ProductList } from "@/components/organisms/ProductList";
import { ActiveLink } from "@/components/atoms/ActiveLink";

export default async function Home() {
	const collections = await getCollections();

	/*Products for TEST*/
	const productsWithPagination = await getProductsList(10, 0);
	const products = productsWithPagination.products.map((v) => v.node);

	return (
		<>
			<main className="flex min-h-screen flex-col items-center p-12">
				<h1>Home</h1>
				<section>
					<ul className="mt-5 flex">
						{collections.map((value) => (
							<li key={value.id}>
								<ActiveLink href={`/collections/${value.slug}`} exact>
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
