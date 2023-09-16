import React, { type ComponentType } from "react";

type StaticPageProps = {
	params: {
		filename: string;
	};
};

export default async function StaticPage({ params }: StaticPageProps) {
	const Page = await import(`./${params.filename}.mdx`).then(
		(module: { default: ComponentType }) => module.default,
	);
	return (
		<article className="prose prose-neutral px-6">
			<Page />
		</article>
	);
}
