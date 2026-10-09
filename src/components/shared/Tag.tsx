import { Badge } from "@/components/ui/badge";

interface TagProps {
	label: string;
	active?: boolean;
	onClick?: (label: string) => void;
}

export function Tag({ label, active = false, onClick }: TagProps) {
	if (!onClick) {
		return (
			<Badge variant={active ? "default" : "outline"} className="capitalize">
				{label}
			</Badge>
		);
	}

	return (
		<button
			type="button"
			onClick={() => onClick(label)}
			className="inline-flex"
			aria-pressed={active}
		>
			<Badge
				variant={active ? "default" : "outline"}
				className="cursor-pointer capitalize"
			>
				{label}
			</Badge>
		</button>
	);
}
