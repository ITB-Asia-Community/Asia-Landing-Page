import { useMemo, useState } from "react";

export interface UseSearchOptions<T> {
	searchKeys?: (keyof T)[];
	filterKey?: keyof T;
	sortKey?: keyof T;
	sortDirection?: "asc" | "desc";
	sortFns?: Record<string, (a: T, b: T) => number>;
	defaultSort?: string;
	pageSize?: number;
}

export interface UseSearchResult<T> {
	query: string;
	setQuery: (value: string) => void;
	category: string;
	setCategory: (value: string) => void;
	sort: string;
	setSort: (value: string) => void;
	page: number;
	setPage: (value: number) => void;
	pageSize: number;
	categories: string[];
	results: T[];
	filtered: T[];
	total: number;
	totalPages: number;
}

function toSearchable(value: unknown): string {
	if (typeof value === "string") {
		return value.toLowerCase();
	}
	if (Array.isArray(value)) {
		return value
			.filter((item) => typeof item === "string")
			.join(" ")
			.toLowerCase();
	}
	return "";
}

export function useSearch<T extends object>(
	data: T[],
	options: UseSearchOptions<T> = {},
): UseSearchResult<T> {
	const {
		searchKeys,
		filterKey,
		sortKey,
		sortDirection = "desc",
		sortFns,
		defaultSort = "terbaru",
		pageSize = 6,
	} = options;

	const [query, setQueryState] = useState("");
	const [category, setCategoryState] = useState("all");
	const [sort, setSortState] = useState(defaultSort);
	const [page, setPageState] = useState(1);

	const setQuery = (value: string) => {
		setQueryState(value);
		setPageState(1);
	};

	const setCategory = (value: string) => {
		setCategoryState(value);
		setPageState(1);
	};

	const setSort = (value: string) => {
		setSortState(value);
		setPageState(1);
	};

	const categories = useMemo(() => {
		if (!filterKey) {
			return [];
		}
		const unique = new Set<string>();
		for (const item of data) {
			const value = item[filterKey];
			if (typeof value === "string" && value.length > 0) {
				unique.add(value);
			}
		}
		return Array.from(unique).sort((a, b) => a.localeCompare(b));
	}, [data, filterKey]);

	const filtered = useMemo(() => {
		const keys =
			searchKeys ??
			(["judul", "deskripsi"] as (keyof T)[]).filter((key) =>
				data.some((item) => key in item),
			);

		let next = data;

		const needle = query.trim().toLowerCase();
		if (needle.length > 0 && keys.length > 0) {
			next = next.filter((item) =>
				keys.some((key) => toSearchable(item[key]).includes(needle)),
			);
		}

		if (filterKey && category !== "all") {
			next = next.filter((item) => item[filterKey] === category);
		}

		const sorter = sortFns?.[sort];
		if (sorter) {
			next = [...next].sort(sorter);
		} else if (sortKey) {
			next = [...next].sort((a, b) => {
				const left = a[sortKey];
				const right = b[sortKey];
				if (typeof left === "string" && typeof right === "string") {
					const compared = left.localeCompare(right);
					return sortDirection === "asc" ? compared : -compared;
				}
				if (typeof left === "number" && typeof right === "number") {
					return sortDirection === "asc" ? left - right : right - left;
				}
				return 0;
			});
		}

		return next;
	}, [
		category,
		data,
		filterKey,
		query,
		searchKeys,
		sort,
		sortDirection,
		sortFns,
		sortKey,
	]);

	const total = filtered.length;
	const totalPages = Math.max(1, Math.ceil(total / pageSize));
	const currentPage = Math.min(page, totalPages);
	const results = filtered.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize,
	);

	return {
		query,
		setQuery,
		category,
		setCategory,
		sort,
		setSort,
		page: currentPage,
		setPage: setPageState,
		pageSize,
		categories,
		results,
		filtered,
		total,
		totalPages,
	};
}
