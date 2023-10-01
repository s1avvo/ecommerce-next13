import { ImageResponse } from "next/server";
import { getProductById } from "@/api/getProductItem";

// export const runtime = "edge";
export const alt = "Ecommerce";
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

type ProductOpengraphImageProps = {
	params: {
		productId: string;
	};
};

export default async function ProductOpengraphImage({ params }: ProductOpengraphImageProps) {
	const product = await getProductById(params.productId);

	if (!product) {
		return new ImageResponse(<>Ecommerce</>, {
			width: 1200,
			height: 630,
		});
	}

	return new ImageResponse(
		(
			<div
				style={{
					fontSize: 24,
					color: "white",
					background: "#000",
					width: "100%",
					height: "100%",
					flexDirection: "row",
					justifyContent: "flex-start",
					alignItems: "flex-start",
					display: "flex",
					gap: "25px",
				}}
			>
				<div
					style={{
						background: "#ffcc00",
						width: "12px",
						height: "100%",
					}}
				/>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						flexBasis: "70%",
						padding: "50px",
						alignSelf: "center",
					}}
				>
					<h1
						style={{
							color: "#ffcc00",
						}}
					>
						{product.name}
					</h1>
					<p>| {product.categories[0]?.name} |</p>
					<p>{product.description}</p>
				</div>
				<div
					style={{
						margin: "50px 0",
						flexBasis: "20%",
						borderRadius: "32px",
						border: "solid 5px #fff",
						background: "#ffcc00",
						display: "flex",
						padding: "10px",
					}}
				>
					<img
						style={{
							objectFit: "cover",
							aspectRatio: "1/1",
						}}
						alt="product"
						src={product.images[0]?.url}
					/>
				</div>
			</div>
		),
		{
			width: 1200,
			height: 630,
		},
	);
}
