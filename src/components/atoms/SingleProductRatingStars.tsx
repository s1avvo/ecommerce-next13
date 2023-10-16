import { RatingStar } from "@/components/atoms/RatingStar";

type SingleProductReviewRatingProps = {
	rating: number;
};

export const SingleProductReviewRating = ({ rating }: SingleProductReviewRatingProps) => {
	const stars = Array.from({ length: 5 }, (_, i) => i + 1).map((i) => ({
		key: i,
		active: i <= Math.round(rating),
	}));

	return (
		<div className="flex items-center justify-between gap-1">
			<span data-testid="product-rating">{rating}/5</span>
			<div className="flex">
				{stars.map((star) => (
					<RatingStar key={star.key} isActive={star.active} />
				))}
			</div>
		</div>
	);
};
