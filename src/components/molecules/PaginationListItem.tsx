import { type Route } from "next";
import { ActiveLink } from "@/components/atoms/ActiveLink";

type PaginationListItemProps = {
	currentPage: number;
	pages: number;
	href: Route<string>;
};

export const PaginationListItem = ({ currentPage, pages, href }: PaginationListItemProps) => {
	return (
		<>
			{Array.from({ length: Math.min(pages, 3) }, (_, i) =>
				pages >= 3
					? i - (currentPage === 1 ? 0 : 1) + (currentPage < pages ? currentPage : currentPage - 1)
					: i + 1,
			).map((page) => {
				return (
					<li key={page}>
						<ActiveLink
							href={`${href}/${page}` as Route}
							className="p-3 text-neutral-600 hover:text-neutral-800"
							activeClassName="font-semibold border-t-2 border-neutral-600 hover:text-neutral-800"
							exact
						>
							{page}
						</ActiveLink>
					</li>
				);
			})}
		</>
	);
};
