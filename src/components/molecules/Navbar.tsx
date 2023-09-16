import { type Route } from "next";
import { ActiveLink } from "@/components/atoms/ActiveLink";

const navbarList: { href: Route<string>; title: string; exact?: boolean }[] = [
	{ href: "/", title: "Home", exact: true },
	{ href: "/products", title: "All" },
];
export const Navbar = () => {
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
			</ul>
		</nav>
	);
};
