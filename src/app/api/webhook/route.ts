import { type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { executeGraphql } from "@/app/api/graphqlApi";
import { ProductGetReviewsRatingDocument, ProductUpdateAverageRatingDocument } from "@/gql/graphql";
import { adminClient } from "@/app/api/typesenseApi";

export type ReviewPostRequest = {
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
	const body = (await request.json()) as ReviewPostRequest;

	if (body && body.data && body.data.product.id) {
		let averageRating = 0;

		const productReviewsRating = await executeGraphql({
			query: ProductGetReviewsRatingDocument,
			variables: {
				id: body.data.product.id,
			},
		});

		if (productReviewsRating && productReviewsRating.reviewsConnection.edges.length > 0) {
			const total = productReviewsRating.reviewsConnection.edges.reduce((acc, edge) => {
				return acc + edge.node.rating;
			}, 0);

			averageRating =
				total === 0
					? 0
					: Math.floor(total / productReviewsRating.reviewsConnection.aggregate.count);
		}

		const averageRatingResponse = await executeGraphql({
			query: ProductUpdateAverageRatingDocument,
			variables: {
				id: body.data.product.id,
				averageRating,
			},
			cache: "no-store",
		});

		const updateTypesense = await adminClient
			.collections("products")
			.documents(`${body.data.product.id}`)
			.update({ averageRating: averageRating });

		console.log(updateTypesense);

		revalidatePath(`/product/${body.data.product.id}`);
		revalidatePath(`/`);

		return new Response(averageRatingResponse.updateProduct?.id, { status: 201 });
	} else {
		return new Response(null, { status: 400 });
	}
}
