import { Button } from "@/components/ui/button";
import {
	Pagination as PaginationNav,
	PaginationContent,
	PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

function pageItems(page: number, totalPages: number): number[] {
	const windowSize = 5;
	const start = Math.max(1, Math.min(page - 2, totalPages - windowSize + 1));
	const end = Math.min(totalPages, start + windowSize - 1);
	const items: number[] = [];
	for (let i = Math.max(1, start); i <= end; i += 1) {
		items.push(i);
	}
	return items;
}

export function Pagination({
	page,
	totalPages,
	onPageChange,
}: PaginationProps) {
	if (totalPages <= 1) {
		return null;
	}

	return (
		<PaginationNav>
			<PaginationContent>
				<PaginationItem>
					<Button
						type="button"
						variant="ghost"
						size="default"
						disabled={page <= 1}
						onClick={() => onPageChange(page - 1)}
						aria-label="Halaman sebelumnya"
					>
						<ChevronLeft data-icon="inline-start" />
						Prev
					</Button>
				</PaginationItem>
				{pageItems(page, totalPages).map((item) => (
					<PaginationItem key={item}>
						<Button
							type="button"
							variant={item === page ? "outline" : "ghost"}
							size="icon"
							onClick={() => onPageChange(item)}
							aria-current={item === page ? "page" : undefined}
							aria-label={`Halaman ${item}`}
						>
							{item}
						</Button>
					</PaginationItem>
				))}
				<PaginationItem>
					<Button
						type="button"
						variant="ghost"
						size="default"
						disabled={page >= totalPages}
						onClick={() => onPageChange(page + 1)}
						aria-label="Halaman berikutnya"
					>
						Next
						<ChevronRight data-icon="inline-end" />
					</Button>
				</PaginationItem>
			</PaginationContent>
		</PaginationNav>
	);
}
