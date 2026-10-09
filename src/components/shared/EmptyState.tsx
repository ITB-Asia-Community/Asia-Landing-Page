import { Button } from "@/components/ui/button";

interface EmptyStateProps {
	title?: string;
	description: string;
	ctaLabel?: string;
	onCta?: () => void;
}

export function EmptyState({
	title = "Tidak ada data",
	description,
	ctaLabel,
	onCta,
}: EmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border px-6 py-12 text-center">
			<p className="font-heading text-sm font-medium">{title}</p>
			<p className="max-w-sm text-sm text-muted-foreground">{description}</p>
			{ctaLabel && onCta ? (
				<Button type="button" variant="outline" onClick={onCta}>
					{ctaLabel}
				</Button>
			) : null}
		</div>
	);
}
