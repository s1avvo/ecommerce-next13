import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import React from "react";

export const AddToCart = () => {
	return (
		<div className="mt-5 flex items-center">
			<div className="mr-5 flex items-center border border-solid border-neutral-400 px-1 py-2">
				<PlusIcon className="m-1 h-4 w-4" />
				<p className="px-3">1</p>
				<MinusIcon className="m-1 h-4 w-4" />
			</div>
			<button className="bg-amber-600 px-6 py-3 text-neutral-100">ADD TO CART</button>
		</div>
	);
};
