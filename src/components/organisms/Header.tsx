import { MagnifyingGlassIcon, ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";
import { Navbar } from "@/components/molecules/Navbar";

export const Header = () => {
	return (
		<header className="bg-wh-900 text-wh-10 flex w-full items-center justify-between px-6 py-4 sm:px-36">
			<div className="text-amber-600">ECOMMERCE</div>
			<Navbar />
			<div className="flex justify-between gap-6">
				<MagnifyingGlassIcon className="h-5 w-5 text-neutral-800" />
				<UserIcon className="h-5 w-5 text-neutral-800" />
				<ShoppingBagIcon className="h-5 w-5 text-neutral-800" />
			</div>
		</header>
	);
};
