import { getProductReview } from "@/app/api/review";
import { SingleProductReviewForm } from "@/components/molecules/SingleProductReviewForm";

type ReviewFormOptimisticProps = {
	productId: string;
};

export const SingleProductReview = async ({ productId }: ReviewFormOptimisticProps) => {
	const reviews = await getProductReview(productId);

	return (
		<section className="flex flex-col gap-10 px-6 py-6 sm:flex-row sm:px-36">
			<SingleProductReviewForm productId={productId} reviews={reviews} />
		</section>
	);
};
