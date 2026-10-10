import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
	categories: string[];
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

export function FilterBar({
	categories,
	value,
	onChange,
	placeholder = "Semua kategori",
}: FilterBarProps) {
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger
				className="h-11 w-full min-w-0 rounded-none border-0 bg-transparent px-3 shadow-none dark:bg-transparent"
				aria-label="Filter kategori"
			>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="all">{placeholder}</SelectItem>
				{categories.map((category) => (
					<SelectItem key={category} value={category}>
						{category}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
