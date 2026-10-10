import type { ReactNode } from "react";

interface FilterToolbarProps {
	children: ReactNode;
}

export function FilterToolbar({ children }: FilterToolbarProps) {
	return (
		<div className="mb-8 grid grid-cols-1 overflow-hidden rounded-xl border border-border bg-card divide-y divide-border sm:grid-flow-col sm:auto-cols-fr sm:divide-x sm:divide-y-0">
			{children}
		</div>
	);
}
