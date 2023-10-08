"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export const SingleProductAddToCartButton = () => {
	const formStatus = useFormStatus();
	return (
		<button
			type="submit"
			disabled={formStatus.pending}
			className="rounded-md bg-amber-600 px-6 py-3 text-neutral-100 disabled:cursor-wait disabled:bg-amber-700"
			data-testid="add-to-cart-button"
		>
			ADD TO CART
		</button>
	);
};
