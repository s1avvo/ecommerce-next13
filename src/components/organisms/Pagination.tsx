import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { type Route } from "next";
import { type PageInfo } from "@/gql/graphql";
import { PaginationListItem } from "@/components/molecules/PaginationListItem";

type PaginationProps = {
	limit: number;
	currentPage: number;
	productsCount: number;
	href: Route<string>;
	pageInfo: PageInfo;
};
export const Pagination = async ({
	productsCount,
	currentPage,
	limit,
	href,
	pageInfo,
}: PaginationProps) => {
	const pages = Math.ceil(productsCount / limit);

	return (
		<section>
			<nav>
				<ul className="mt-10 flex items-center justify-center gap-5" aria-label="pagination">
					{pageInfo.hasPreviousPage && (
						<li key="prev">
							<Link
								href={`${href}/${currentPage - 1}` as Route}
								className="flex rounded-md border border-neutral-200 p-2"
							>
								<ChevronLeftIcon
									title="Previous page"
									aria-label="Previous page"
									className="h-5 w-5 cursor-pointer"
								/>
							</Link>
						</li>
					)}
					<PaginationListItem currentPage={currentPage} pages={pages} href={href} />
					{pageInfo.hasNextPage && (
						<li key="next">
							<Link
								href={`${href}/${currentPage + 1}` as Route}
								className="flex rounded-md border border-neutral-200 p-2"
							>
								<ChevronRightIcon
									title="Next page"
									aria-label="Next page"
									className="h-5 w-5 cursor-pointer"
								/>
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</section>
	);
};
