import NextImage from "next/image";

type ProductListItemImageProps = {
	src: string;
	alt: string;
};

export const ProductListItemImage = ({ src, alt }: ProductListItemImageProps) => {
	return (
		<div className="flex aspect-square max-w-[220px] items-center justify-center">
			<NextImage
				width={220}
				height={220}
				placeholder="empty"
				src={src}
				alt={alt}
				className="object-contain object-center transition-transform hover:opacity-70"
				quality={50}
				priority
			/>
		</div>
	);
};
