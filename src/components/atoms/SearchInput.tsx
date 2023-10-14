"use client";
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const SearchInput = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [query, setQuery] = useState(searchParams.get("query") || "");
	const [value] = useDebounce(query, 500);

	const handleSearchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.value === "") {
			router.back();
		}

		setQuery(event.target.value);
	};

	const handleSearchOnSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		router.push(`/search?query=${query?.toString()}`);
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
				onChange={handleSearchOnChange}
			/>
			<button type="submit">
				<MagnifyingGlassIcon
					name="search"
					className="h-5 w-5 text-neutral-800"
					title="Search"
					aria-label="search-icon"
				/>
			</button>
		</form>
	);
};
