import type { ReactNode } from "react";

interface PageShellProps {
	title: string;
	description?: string;
	actions?: ReactNode;
	children: ReactNode;
}

export function PageShell({
	title,
	description,
	actions,
	children,
}: PageShellProps) {
	return (
		<div className="page-surface relative isolate min-h-[70vh]">
			<div className="page-grid pointer-events-none absolute inset-x-0 top-0 h-72" />
			<div className="relative mx-auto max-w-6xl px-4 pt-28 pb-16 sm:pt-32">
				<div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<div className="max-w-2xl space-y-2">
						<h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
							{title}
						</h1>
						{description ? (
							<p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
								{description}
							</p>
						) : null}
					</div>
					{actions}
				</div>
				{children}
			</div>
		</div>
	);
}
