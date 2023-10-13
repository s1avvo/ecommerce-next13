import Link from "next/link";
import { ShoppingBagIcon, UserIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Navbar } from "@/components/molecules/Navbar";
import { SearchInput } from "@/components/atoms/SearchInput";
import { getCartByIdFromCookie } from "@/app/api/cart";

export const Header = async () => {
	const cart = await getCartByIdFromCookie();
	const quantity = cart?.orderItems.length ?? 0;

	return (
		<header className="bg-wh-900 text-wh-10 flex w-full items-center justify-between px-6 py-4 sm:px-36">
			<Navbar />
			<div className="flex items-center justify-between gap-6">
				<SearchInput />
				<SignedIn>
					<UserButton afterSignOutUrl="/" />
					<Link href={"/orders"}>
						<ListBulletIcon className="h-5 w-5 cursor-pointer text-neutral-800" />
					</Link>
				</SignedIn>
				<SignedOut>
					<SignInButton>
						<UserIcon className="h-5 w-5 cursor-pointer text-neutral-800" />
					</SignInButton>
				</SignedOut>
				<Link href={"/cart"}>
					<ShoppingBagIcon className="h-5 w-5 text-neutral-800" />
				</Link>
				<span className="font-semibold">{quantity}</span>
			</div>
		</header>
	);
};
