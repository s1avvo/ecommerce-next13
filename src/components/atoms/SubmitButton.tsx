"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type SubmitButtonProps = {
	label: string;
};
export const SubmitButton = ({ label }: SubmitButtonProps) => {
	const formStatus = useFormStatus();
	return (
		<button
			type="submit"
			disabled={formStatus.pending}
			className="rounded-md bg-amber-600 px-6 py-3 text-neutral-100 disabled:cursor-wait disabled:bg-amber-700"
			data-testid={label === "ADD TO CART" ? "add-to-cart-button" : undefined}
		>
			{label}
		</button>
	);
};
