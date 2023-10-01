"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteItem } from "@/app/cart/actions";

type DeleteProductFromCartButtonProps = {
	itemId: string;
};

export const DeleteProductFromCartButton = ({ itemId }: DeleteProductFromCartButtonProps) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	return (
		<button
			type="submit"
			disabled={isPending}
			className="ml-5 bg-amber-600 px-6 py-3 text-neutral-100 disabled:cursor-wait disabled:bg-amber-700"
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
