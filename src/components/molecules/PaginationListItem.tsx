import { ActiveLink } from "@/components/atoms/ActiveLink";

type PaginationListItemProps = {
	currentPage: number;
	pages: number;
};

export const PaginationListItem = ({ currentPage, pages }: PaginationListItemProps) => {
	return (
		<>
			{Array.from(
				{ length: 3 },
				(_, i) =>
					i - (currentPage === 1 ? 0 : 1) + (currentPage < pages ? currentPage : currentPage - 1),
			).map((page) => {
				return (
					<li key={page}>
						<ActiveLink
							href={`/products/${page}`}
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
