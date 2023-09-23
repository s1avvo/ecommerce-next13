"use client";
import { type Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type SingleProductSizeVariantFragment } from "@/gql/graphql";

type SelectVariantsSizeProps = {
	size?: SingleProductSizeVariantFragment[];
};
export const SelectVariantsSize = ({ size }: SelectVariantsSizeProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	return (
		<>
			{size && size[0] && (
				<select
					name="variants-size"
					id="variants-size-id"
					value={searchParams.get("size") || "Size"}
					onChange={(event) =>
						router.push(`${pathname}?size=${event.target.value}`.toString() as Route)
					}
				>
					<option disabled selected>
						Size
					</option>
					{size.map((v) => (
						<option key={v.id} value={v.name}>
							{v.size}
						</option>
					))}
				</select>
			)}
		</>
	);
};
