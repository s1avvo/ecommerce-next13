import Link from "next/link";
import { ShoppingBagIcon, UserIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SearchInput } from "@/components/atoms/SearchInput";
import { getCartByIdFromCookie } from "@/app/api/cart";
import { NavbarWithHamburger } from "@/components/molecules/NavbarWithHamburger";

export const Header = async () => {
	const cart = await getCartByIdFromCookie();
	const quantity = cart?.orderItems.length ?? 0;

	return (
		<header className="bg-wh-900 text-wh-10 flex h-20 w-full items-center justify-between gap-3 overflow-x-auto px-6 py-4 sm:h-auto sm:px-36">
			<NavbarWithHamburger />
			<div className="flex  items-center justify-between gap-3 ">
				<SearchInput />
				<SignedIn>
					<UserButton afterSignOutUrl="/" />
					<Link href={"/orders"}>
						<ListBulletIcon
							name="orders"
							title="Orders"
							className="h-5 w-5 cursor-pointer text-neutral-800"
							aria-label="orders-icon"
						/>
					</Link>
				</SignedIn>
				<SignedOut>
					<SignInButton>
						<UserIcon
							name="user"
							className="h-5 w-5 cursor-pointer text-neutral-800"
							title="User"
							aria-label="user-icon"
						/>
					</SignInButton>
				</SignedOut>
				<Link href={"/cart"}>
					<ShoppingBagIcon
						name="cart"
						className="h-5 w-5 text-neutral-800"
						title="Cart"
						aria-label="shop-icon"
					/>
				</Link>
				<span className="font-semibold">{quantity}</span>
			</div>
		</header>
	);
};
