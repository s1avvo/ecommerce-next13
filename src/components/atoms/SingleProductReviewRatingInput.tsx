"use client";
import React, { useState } from "react";

export const SingleProductReviewRatingInput = () => {
	const [rating, setRating] = useState(0);
	return (
		<>
			<label htmlFor="rating-id">Rating</label>
			<input
				min="0"
				max="5"
				step="1"
				type="range"
				value={rating}
				name="rating"
				id="rating-id"
				onChange={(event) => setRating(Number(event.target.value))}
				required
			/>
		</>
	);
};

//TODO do zaimplementowania

// export const Star = ({ isActive, size = 4 }: { isActive: boolean; size?: 4 | 5 }) => {
// 	const className = `w-${size} h-${size} ${
// 		isActive ? "text-indigo-500 " : "text-gray-300text-gray-300 dark:text-gray-500"
// 	}`;
// 	return (
// 		<>
// 			<svg
// 				className={className}
// 				aria-hidden="true"
// 				xmlns="http://www.w3.org/2000/svg"
// 				fill="currentColor"
// 				viewBox="0 0 22 20"
// 			>
// 				<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
// 			</svg>
// 		</>
// 	);
// };
//
// import { Star } from "@atoms/Star";
//
// export const RatingStars = ({ rating }: { rating: number | null | undefined }) => {
// 	// if (!rating) return;
// 	const stars = [];
// 	for (let i = 1; i < 6; i++) {
// 		stars.push({
// 			key: i,
// 			active: !rating || i <= Math.round(rating),
// 		});
// 	}
//
// 	return (
// 		<div className="flex flex-shrink-0 flex-grow-0 items-center gap-2">
// 			<span data-testid="product-rating" className="small-caps text-xs">
// 				{rating ?? 5}/5
// 			</span>
// 			<div className="flex flex-shrink-0">
// 				{stars.map((star) => (
// 					<Star key={star.key} isActive={star.active} />
// 				))}
// 			</div>
// 		</div>
// 	);
// };
