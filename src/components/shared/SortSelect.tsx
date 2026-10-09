import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface SortOption {
	value: string;
	label: string;
}

interface SortSelectProps {
	value: string;
	onChange: (value: string) => void;
	options: SortOption[];
}

export function SortSelect({ value, onChange, options }: SortSelectProps) {
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger
				className="w-full min-w-40 sm:w-48"
				aria-label="Urutkan"
			>
				<SelectValue placeholder="Urutkan" />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
