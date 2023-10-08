import { Loading } from "@/components/atoms/Loading";

export default function LoadingProduct() {
	return (
		<div className="flex min-h-screen items-center justify-center" aria-busy="true">
			<Loading />
		</div>
	);
}
