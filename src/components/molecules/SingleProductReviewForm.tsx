"use client";
import React, { experimental_useOptimistic as useOptimistic, useRef, useState } from "react";
import { type ReviewItemFragment } from "@/gql/graphql";
import { SingleProductReviewInput } from "@/components/atoms/SingleProductReviewInput";
import { SubmitButton } from "@/components/atoms/SubmitButton";
import { Review } from "@/components/atoms/Review";
import { addReviewAction } from "@/app/product/[productId]/actions";
import { RatingStarsForm } from "@/components/atoms/RatingStarsForm";

type SingleProductReviewFormProps = {
	productId: string;
	reviews: ReviewItemFragment[];
};
export const SingleProductReviewForm = ({ productId, reviews }: SingleProductReviewFormProps) => {
	const ref = useRef<HTMLFormElement>(null);
	const [stars, setStars] = useState(1);
	const [optimisticReview, setOptimisticReview] = useOptimistic(
		reviews,
		(state, review: ReviewItemFragment) => [...state, review],
	);

	async function addOptimisticReviews(formData: FormData) {
		const newReview: ReviewItemFragment = {
			id: productId,
			headline: String(formData.get("headline")),
			content: String(formData.get("content")),
			rating: Number(formData.get("rating")),
			name: String(formData.get("name")),
			email: String(formData.get("email")),
		};

		setOptimisticReview(newReview);
		await addReviewAction(productId, formData);

		ref.current?.reset();
		setStars(1);
	}

	return (
		<>
			<div className="h-96 w-full sm:basis-1/3">
				<form
					ref={ref}
					className="flex flex-col gap-2"
					action={addOptimisticReviews}
					data-testid="add-review-form"
				>
					<SingleProductReviewInput label={"Title"} type={"text"} name={"headline"} />
					<label htmlFor="content">Content</label>
					<textarea
						className="rounded-md border border-neutral-400"
						name="content"
						id="content"
						placeholder="Add your comment.."
						rows={3}
						required
					/>
					<RatingStarsForm value={stars} onClick={(selectedStars) => setStars(selectedStars)} />
					<SingleProductReviewInput label={"Name"} type={"text"} name={"name"} />
					<SingleProductReviewInput label={"Email"} type={"email"} name={"email"} />
					<SubmitButton label={"ADD REVIEW"} />
				</form>
			</div>
			{reviews && (
				<div className="h-auto w-full sm:basis-2/3">
					{optimisticReview.map((review) => (
						<Review key={review.id} review={review} />
					))}
				</div>
			)}
		</>
	);
};
