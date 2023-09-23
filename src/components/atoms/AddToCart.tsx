"use client";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

export const AddToCart = () => {
	const [counter, setCounter] = useState(0);

	return (
		<div className="mt-10 flex">
			<div className="flex items-center justify-between gap-5">
				<MinusIcon
					className="box-content h-5 w-5  cursor-pointer p-2"
					onClick={() => setCounter((prevState) => (counter > 0 ? prevState - 1 : 0))}
				/>
				<span>{counter}</span>
				<PlusIcon
					className="box-content h-5 w-5 cursor-pointer p-2"
					onClick={() => setCounter((prevState) => prevState + 1)}
				/>
			</div>
			<button className="ml-5 bg-amber-600 px-6 py-3 text-neutral-100">ADD TO CART</button>
		</div>
	);
};
