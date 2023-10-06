"use client";
import React, { experimental_useOptimistic as useOptimistic, useRef } from "react";
import { type ReviewItemFragment } from "@/gql/graphql";
import { SingleProductReviewInput } from "@/components/atoms/SingleProductReviewInput";
import { SingleProductReviewRatingInput } from "@/components/atoms/SingleProductReviewRatingInput";
import { SubmitButton } from "@/components/atoms/SubmitButton";
import { Review } from "@/components/atoms/Review";
import { addReview } from "@/app/product/[productId]/actions";

type SingleProductReviewFormProps = {
	productId: string;
	reviews: ReviewItemFragment[];
};
export const SingleProductReviewForm = ({ productId, reviews }: SingleProductReviewFormProps) => {
	const ref = useRef<HTMLFormElement>(null);
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
		await addReview(productId, formData);
		ref.current?.reset();
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
					<SingleProductReviewRatingInput />
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
