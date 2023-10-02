import { type NextRequest } from "next/server";
import { executeGraphql } from "@/api/graphqlApi";
import { ProductUpdateAverageRatingDocument } from "@/gql/graphql";

export type ReviewPost = {
	operation: string;
	data: {
		content: string;
		email: string;
		headline: string;
		id: string;
		name: string;
		product: { id: string };
		rating: number;
	};
};

export async function POST(request: NextRequest) {
	const body = (await request.json()) as ReviewPost;
	const review = await request.text();

	const averageReview = await executeGraphql({
		query: ProductUpdateAverageRatingDocument,
		variables: {
			id: body.data.product.id,
			ratingAverage: body.data.rating,
		},
	});

	if (!averageReview) {
		return new Response(null, { status: 400 });
	}

	console.log("Body Json", body);
	console.log("Product text", review);

	return new Response(averageReview.updateProduct?.id, { status: 204 });

	// if (
	// 	typeof body === "object"
	// 	// body &&
	// 	// "productId" in body &&
	// 	// typeof body.productId === "string"
	// ) {
	// 	console.log("Body Json", body);
	// 	console.log("Product text", review);
	//
	// 	return new Response(review, { status: 204 });
	// } else {
	// 	return new Response(null, { status: 400 });
	// }
}
