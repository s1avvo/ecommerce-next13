import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/",
		"/search",
		"/cart",
		"/cart/canceled",
		"/cart/success",
		"/categories/accessories",
		"/categories/accessories(.*)",
		"/categories/hoodies",
		"/categories/hoodies(.*)",
		"/categories/t-shirts",
		"/categories/t-shirts(.*)",
		"/collections",
		"/collections(.*)",
		"/products",
		"/products(.*)",
		"/product",
		"/product(.*)",
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		"/policies",
	],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
	// matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
