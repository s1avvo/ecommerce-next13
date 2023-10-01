"use client";
import React, { experimental_useOptimistic as useOptimistic, useRef } from "react";
import { SingleProductReviewInput } from "@/components/atoms/SingleProductReviewInput";
import { SingleProductReviewRatingInput } from "@/components/atoms/SingleProductReviewRatingInput";
import { type ReviewItemFragment } from "@/gql/graphql";
import { addReview } from "@/app/product/[productId]/actions";
import { SubmitButton } from "@/components/atoms/SubmitButton";
import { Review } from "@/components/atoms/Review";

type ReviewFormOptimisticProps = {
	productId: string;
	reviews: ReviewItemFragment[];
};

export const SingleProductReview = ({ productId, reviews }: ReviewFormOptimisticProps) => {
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
		<section className="flex flex-row gap-3 px-6 py-6 sm:grid-cols-3 sm:px-36">
			<div className="h-96 w-full basis-1/3">
				<form
					ref={ref}
					className="flex flex-col gap-2 px-6"
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
			<div className="h-auto w-full basis-2/3">
				{optimisticReview.map((review) => (
					<Review key={review.id} review={review} />
				))}
			</div>
		</section>
	);
};
