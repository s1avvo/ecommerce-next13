import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
	const body: unknown = await request.json();
	const product = await request.text();

	if (
		typeof body === "object" &&
		body &&
		"productId" in body &&
		typeof body.productId === "string"
	) {
		console.log("Body Json", body);
		console.log("Product text", body);
		return new Response(product, { status: 204 });
	} else {
		return new Response(null, { status: 400 });
	}
}
