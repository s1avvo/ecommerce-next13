"use client";
import { RatingStar } from "@/components/atoms/RatingStar";

type RatingStarsInputProps = {
	value: number;
	onClick: (d: number) => void;
};

export const RatingStarsForm = ({ value, onClick }: RatingStarsInputProps) => {
	return (
		<fieldset name="rating" className="flex items-center gap-2">
			<input type="hidden" name="rating" value={value} />
			Rating:
			{Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
				<RatingStar key={i} isActive={i <= value} onClick={() => onClick(i)} />
			))}
		</fieldset>
	);
};
