"use client";
import { useRouter } from "next/navigation";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

export const CartContinueShoppingButton = () => {
	const router = useRouter();
	return (
		<button
			className="flex items-center justify-between gap-5  px-6 py-3 text-neutral-600"
			onClick={() => router.back()}
		>
			Continue Shopping
			<ArrowUturnLeftIcon width={25} height={25} className="rounded-md bg-neutral-200 p-1" />
		</button>
	);
};
