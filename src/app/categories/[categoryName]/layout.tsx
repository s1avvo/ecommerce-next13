import type React from "react";
import { getCategories } from "@/app/api/getCategoriesList";

export async function generateStaticParams() {
	const categories = await getCategories();

	return categories.map((category) => ({
		categoryName: category.slug,
	}));
}

export default function CategoryProductLayout({ children }: { children: React.ReactNode }) {
	return children;
}
