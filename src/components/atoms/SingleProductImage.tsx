import NextImage from "next/image";

type ProductListItemImageProps = {
	src: string;
	alt: string;
};

export const SingleProductImage = ({ src, alt }: ProductListItemImageProps) => {
	return (
		<div className="relative aspect-auto h-96 w-auto">
			<NextImage
				fill
				src={src}
				alt={alt}
				sizes="(max-width: 480px) 100vw,
                (max-width: 768px) 75vw,
                (max-width: 1060px) 50vw,
                25vw"
				className="object-contain object-center transition-transform hover:opacity-70"
				quality={75}
				priority={true}
			/>
		</div>
	);
};
