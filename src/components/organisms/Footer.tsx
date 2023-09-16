import Link from "next/link";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

export const Footer = () => {
	return (
		<footer className="bg-wh-900 text-wh-10 flex w-full items-center justify-between bg-neutral-900 px-6 py-4 text-neutral-100 sm:px-36">
			<p>ECOMMERCE &copy;2023</p>
			<Link href={"/policies"} className="flex gap-2">
				<DocumentTextIcon className="h-5 w-5" />
				<p>Policies and rules.</p>
			</Link>
		</footer>
	);
};
