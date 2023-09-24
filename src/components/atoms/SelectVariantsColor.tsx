"use client";
import { type Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type SingleProductColorVariantFragment } from "@/gql/graphql";

type SelectVariantsColorProps = {
	color?: SingleProductColorVariantFragment[];
};
export const SelectVariantsColor = ({ color }: SelectVariantsColorProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	return (
		<>
			{color && color[0] && (
				<select
					name="variants-color"
					id="variants-color-id"
					value={searchParams.get("color") || "Color"}
					onChange={(event) =>
						router.push(`${pathname}?color=${event.target.value}`.toString() as Route)
					}
				>
					<option disabled>Color</option>
					{color.map((v) => (
						<option key={v.id} value={v.name}>
							{v.color}
						</option>
					))}
				</select>
			)}
		</>
	);
};
