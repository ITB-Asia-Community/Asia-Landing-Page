import { Button } from "@/components/ui/button";

interface ErrorStateProps {
	title?: string;
	description?: string;
	onRetry?: () => void;
}

export function ErrorState({
	title = "Terjadi kesalahan",
	description = "Data gagal dimuat. Coba lagi beberapa saat.",
	onRetry,
}: ErrorStateProps) {
	return (
		<div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border px-6 py-12 text-center">
			<p className="font-heading text-sm font-medium">{title}</p>
			<p className="max-w-sm text-sm text-muted-foreground">{description}</p>
			{onRetry ? (
				<Button type="button" variant="outline" onClick={onRetry}>
					Coba lagi
				</Button>
			) : null}
		</div>
	);
}
