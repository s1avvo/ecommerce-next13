import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/",
		"/search",
		"/cart",
		"/categories/accessories",
		"/categories/accessories(.*)",
		"/categories/hoodies",
		"/categories/hoodies(.*)",
		"/categories/t-shirts",
		"/categories/t-shirts(.*)",
		"/products",
		"/products(.*)",
		"/product",
		"/product(.*)",
	],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
	// matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
