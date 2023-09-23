import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";
import { Navbar } from "@/components/molecules/Navbar";
import { SearchInput } from "@/components/atoms/SearchInput";

export const Header = () => {
	return (
		<header className="bg-wh-900 text-wh-10 flex w-full items-center justify-between px-6 py-4 sm:px-36">
			<Navbar />
			<div className="flex items-center justify-between gap-6">
				<SearchInput />
				<UserIcon className="h-5 w-5 text-neutral-800" />
				<ShoppingBagIcon className="h-5 w-5 text-neutral-800" />
			</div>
		</header>
	);
};
