import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

export const OrderNoFound = ({ user }: { user: string }) => {
	return (
		<section className="flex h-full w-full flex-col items-center justify-center">
			<div className="flex h-24 w-full flex-row items-center justify-between border-t-4 border-amber-600 bg-neutral-100">
				<h1 className="px-6 py-1 text-2xl text-amber-600 sm:px-36">
					{user?.toUpperCase()}&rsquo;S ORDERS
				</h1>
			</div>
			<div className="flex h-full flex-col items-center justify-center">
				<ClipboardDocumentListIcon className="my-6" width={250} />
				<h2 className="mb-3 rounded-t-md border-b-4 border-amber-600 p-3 text-5xl font-semibold">
					NO ORDER FOUND
				</h2>
				<p>Looks like you haven&apos;t made order yet.</p>
			</div>
		</section>
	);
};
