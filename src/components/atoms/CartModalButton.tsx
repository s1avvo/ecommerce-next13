"use client";
import { useTransition } from "react";

type RefreshButtonProps = {
	label: string;
};
export const CartModalButton = ({ label }: RefreshButtonProps) => {
	const [isPending, startTransition] = useTransition();
	return (
		<button
			type="submit"
			disabled={isPending}
			className="rounded-md bg-amber-600 px-6 py-3 text-neutral-100 disabled:cursor-wait disabled:bg-amber-700"
			onClick={() =>
				startTransition(function onClick() {
					window.location.href = "/cart";
				})
			}
		>
			{label}
		</button>
	);
};
