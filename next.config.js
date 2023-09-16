/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["ts", "tsx", "mdx"],

	experimental: {
		typedRoutes: true,
		mdxRs: true,
	},

	async redirects() {
		return [
			{
				source: "/products",
				destination: "/products/1",
				permanent: true,
			},
		];
	},
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
