"use client";
import { type Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { type SingleProductSizeColorVariantFragment } from "@/gql/graphql";

type SelectVariantsSizeAndColorProps = {
	sizeAndColor?: SingleProductSizeColorVariantFragment[];
};
export const SelectVariantsSizeAndColor = ({ sizeAndColor }: SelectVariantsSizeAndColorProps) => {
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
			{sizeAndColor && sizeAndColor[0] && (
				<select
					name="variants-size"
					id="variants-size-id"
					value={searchParams.get("sizeAndColor") || "Size/Color"}
					onChange={(event) =>
						router.push(
							`${pathname}?${createQueryString("sizeAndColor", event.target.value)}` as Route,
						)
					}
				>
					<option disabled>Size/Color</option>
					{sizeAndColor.map((v) => (
						<option key={v.id} value={v.name}>
							{v.size}/{v.color}
						</option>
					))}
				</select>
			)}
		</>
	);
};
