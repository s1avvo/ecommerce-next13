"use client";
import { type FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const SearchInput = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [query, setQuery] = useState(searchParams.get("query") || "");
	const [value] = useDebounce(query, 500);

	const handleSearchOnSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (query !== "") {
			router.push(`/search?query=${query?.toString()}`);
		}
	};

	useEffect(() => {
		if (value) {
			router.push(`/search?query=${query?.toString()}`);
		}
	}, [value]);

	return (
		<form className="flex justify-between gap-3" action={`/search`} onSubmit={handleSearchOnSubmit}>
			<input
				name="serch"
				className="w-[200px] rounded-md border p-2 "
				type="search"
				role="searchbox"
				placeholder="Search..."
				autoComplete="off"
				value={query}
				onChange={(event) => setQuery(event.target.value)}
			/>
			<button type="submit" name="search">
				<MagnifyingGlassIcon
					name="search-icon"
					className="h-5 w-5 text-neutral-800"
					title="Search"
					aria-label="search-icon"
				/>
			</button>
		</form>
	);
};
