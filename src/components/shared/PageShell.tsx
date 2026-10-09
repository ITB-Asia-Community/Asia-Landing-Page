import type { ReactNode } from "react";
import {
	Breadcrumb,
	type BreadcrumbCrumb,
} from "@/components/shared/Breadcrumb";

interface PageShellProps {
	title: string;
	description?: string;
	crumbs?: BreadcrumbCrumb[];
	actions?: ReactNode;
	children: ReactNode;
}

export function PageShell({
	title,
	description,
	crumbs,
	actions,
	children,
}: PageShellProps) {
	return (
		<div className="mx-auto max-w-6xl px-4 py-10">
			{crumbs ? (
				<div className="mb-6">
					<Breadcrumb items={crumbs} />
				</div>
			) : null}
			<div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
				<div className="space-y-1">
					<h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
						{title}
					</h1>
					{description ? (
						<p className="max-w-2xl text-sm text-muted-foreground">
							{description}
						</p>
					) : null}
				</div>
				{actions}
			</div>
			{children}
		</div>
	);
}
