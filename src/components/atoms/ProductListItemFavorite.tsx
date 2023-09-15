"use client";
import { useState } from "react";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/outline";

export const ProductListItemFavorite = () => {
	const [isFavorite, setIsFavorite] = useState(false);

	return (
		<div className="absolute right-3 top-3 flex w-full justify-end">
			<div className="aspect-square rounded-full bg-slate-50 p-1 text-gray-900 opacity-75">
				{isFavorite ? (
					<StarIconSolid className="h-6 w-6 text-gray-700" onClick={() => setIsFavorite(false)} />
				) : (
					<StarIcon className="h-6 w-6 text-gray-700" onClick={() => setIsFavorite(true)} />
				)}
			</div>
		</div>
	);
};
