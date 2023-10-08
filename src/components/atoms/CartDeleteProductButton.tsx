"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteItem } from "@/app/cart/actions";

type CartDeleteProductButtonProps = {
	itemId: string;
};

export const CartDeleteProductButton = ({ itemId }: CartDeleteProductButtonProps) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	return (
		<button
			type="submit"
			disabled={isPending}
			className="w-full rounded-md bg-amber-600 py-3 text-neutral-100 disabled:cursor-wait disabled:bg-amber-700"
			onClick={() =>
				startTransition(async () => {
					await deleteItem(itemId);
					router.refresh();
				})
			}
		>
			REMOVE
		</button>
	);
};
