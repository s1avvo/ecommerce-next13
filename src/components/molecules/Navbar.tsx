import { type Route } from "next";
import { ActiveLink } from "@/components/atoms/ActiveLink";

const navbarList: { href: Route<string>; title: string; exact?: boolean }[] = [
	{ href: "/", title: "Home", exact: true },
	{ href: "/products", title: "All" },
	{ href: "/categories/t-shirts", title: "T-Shirts" },
	{ href: "/categories/hoodies", title: "Hoodies" },
	{ href: "/categories/accessories", title: "Accessories" },
];
export const Navbar = async () => {
	// const categories = await getCategories();
	return (
		<nav>
			<ul className="flex justify-between gap-6">
				{navbarList.map(({ href, title, exact }, index) => (
					<li key={index}>
						<ActiveLink href={href} exact={exact}>
							{title}
						</ActiveLink>
					</li>
				))}
				{/*{categories.map((value) => (*/}
				{/*	<li key={value.id}>*/}
				{/*		<ActiveLink href={`/categories/${value.slug}` as Route}>{value.name}</ActiveLink>*/}
				{/*	</li>*/}
				{/*))}*/}
			</ul>
		</nav>
	);
};
