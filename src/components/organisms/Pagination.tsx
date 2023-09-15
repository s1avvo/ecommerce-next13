import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { PaginationListItem } from "@/components/molecules/PaginationListItem";

type PaginationProps = {
	limit: number;
	currentPage: number;
	totalPages: number;
};
export const Pagination = async ({ totalPages, currentPage, limit }: PaginationProps) => {
	const pages = Math.ceil(totalPages / limit);
	const isPrevious = currentPage !== 1;
	const isNext = pages > currentPage + 1;

	return (
		<nav>
			<ul className="mt-10 flex items-center justify-center gap-5" aria-label="pagination">
				{isPrevious && (
					<li key="prev">
						<Link
							href={`/products/${currentPage - 1}`}
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
				<PaginationListItem currentPage={currentPage} pages={pages} />
				{isNext && (
					<li key="next">
						<Link
							href={`/products/${currentPage + 1}`}
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
	);
};
