type ProductListItemImageProps = {
	src: string;
	alt: string;
};

export const ProductListItemImage = ({ src, alt }: ProductListItemImageProps) => {
	return (
		<img
			width={220}
			height={300}
			src={src}
			alt={alt}
			className="h-full w-full rounded-md object-contain object-center transition-transform hover:opacity-70"
		/>
	);
};
