"use client";
import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type Route } from "next";
import {
	type SingleProductColorVariantFragment,
	type SingleProductSizeColorVariantFragment,
	type SingleProductSizeVariantFragment,
} from "@/gql/graphql";

type SingleProductVariantProps = {
	variants:
		| SingleProductColorVariantFragment[]
		| SingleProductSizeColorVariantFragment[]
		| SingleProductSizeVariantFragment[]
		| undefined;
};

export const SingleProductVariantsSelect = ({ variants }: SingleProductVariantProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);

			return params.toString();
		},
		[searchParams],
	);

	return (
		<>
			{variants && variants[0] && (
				<select
					name="variants-size"
					id="variants-size-id"
					value={searchParams.get("variant") || "Size/Color"}
					onChange={(event) =>
						router.push(`${pathname}?${createQueryString("variant", event.target.value)}` as Route)
					}
				>
					<option disabled>Size/Color</option>
					{variants.map((v) => (
						<option key={v.id} value={v.name}>
							{v.name}
						</option>
					))}
				</select>
			)}
		</>
	);
};
