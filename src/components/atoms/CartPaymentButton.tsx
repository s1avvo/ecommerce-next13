"use client";
import { useTransition } from "react";
import { paymentAction } from "@/app/cart/actions";
import { type CartFragment } from "@/gql/graphql";

type CartPaymentButonProps = {
	cart: CartFragment;
};

export const CartPaymentButon = ({ cart }: CartPaymentButonProps) => {
	const [isPending, startTransition] = useTransition();

	return (
		<button
			type="submit"
			disabled={isPending}
			className="w-full max-w-md rounded-md bg-amber-600 py-3 text-neutral-100 disabled:cursor-wait disabled:bg-amber-700"
			onClick={() =>
				startTransition(async () => {
					await paymentAction(cart);
				})
			}
		>
			PAY
		</button>
	);
};
