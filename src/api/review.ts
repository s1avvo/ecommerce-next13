import { revalidateTag } from "next/cache";
import { executeGraphql } from "@/api/graphqlApi";
import {
	type ReviewItemFragment,
	ReviewCreateDocument,
	ReviewPublishDocument,
	ReviewGetByProductIdDocument,
} from "@/gql/graphql";

export const getProductReview = async (id: string) => {
	const reviewsResponse = await executeGraphql({
		query: ReviewGetByProductIdDocument,
		variables: {
			id,
		},
		next: { tags: ["review"] },
	});

	const review = reviewsResponse.reviewsConnection.edges.map((review) => review.node);

	return review;
};
export const createReview = async (review: ReviewItemFragment) => {
	const reviewId = await executeGraphql({
		query: ReviewCreateDocument,
		variables: {
			...review,
		},
	});

	return reviewId;
};

export const publishReview = async (reviewID: string) => {
	await executeGraphql({
		query: ReviewPublishDocument,
		variables: {
			id: reviewID,
		},
	});

	revalidateTag("review");
};
