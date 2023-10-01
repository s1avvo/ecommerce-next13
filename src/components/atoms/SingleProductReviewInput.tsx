import React from "react";

type SingleProductReviewInputProps = {
	label: string;
	type: React.HTMLInputTypeAttribute;
	name: string;
};
export const SingleProductReviewInput = ({ label, type, name }: SingleProductReviewInputProps) => {
	return (
		<>
			<label htmlFor={`${name}-id`}>{label}</label>
			<input
				className="h-8 rounded-md border border-neutral-400"
				type={type}
				name={name}
				id={`${name}-id`}
				required
			/>
		</>
	);
};
