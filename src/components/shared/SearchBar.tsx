import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

export function SearchBar({
	value,
	onChange,
	placeholder = "Cari judul atau deskripsi...",
}: SearchBarProps) {
	return (
		<div className="relative min-w-0 w-full">
			<Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
			<Input
				type="search"
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
				className="h-full w-full rounded-none border-0 bg-transparent pr-3 pl-9 shadow-none focus-visible:ring-0 dark:bg-transparent"
				aria-label="Pencarian"
			/>
		</div>
	);
}
