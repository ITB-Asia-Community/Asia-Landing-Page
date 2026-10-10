import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Event } from "@/lib/types";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const MONTHS = [
	"Januari",
	"Februari",
	"Maret",
	"April",
	"Mei",
	"Juni",
	"Juli",
	"Agustus",
	"September",
	"Oktober",
	"November",
	"Desember",
];

function parseIso(iso: string): { y: number; m: number; d: number } {
	const [y, m, d] = iso.split("-").map(Number);
	return { y, m, d };
}

function daysInMonth(year: number, month: number): number {
	return new Date(year, month, 0).getDate();
}

function mondayIndex(year: number, month: number): number {
	const jsDay = new Date(year, month - 1, 1).getDay();
	return (jsDay + 6) % 7;
}

interface EventCalendarProps {
	events: Event[];
}

export function EventCalendar({ events }: EventCalendarProps) {
	const first = events[0]
		? parseIso(events[0].tanggal)
		: { y: 2026, m: 10, d: 1 };
	const [cursor, setCursor] = useState({ y: first.y, m: first.m });

	const eventDays = useMemo(() => {
		const map = new Map<number, Event[]>();
		for (const event of events) {
			const parsed = parseIso(event.tanggal);
			if (parsed.y === cursor.y && parsed.m === cursor.m) {
				const current = map.get(parsed.d) ?? [];
				current.push(event);
				map.set(parsed.d, current);
			}
		}
		return map;
	}, [cursor.m, cursor.y, events]);

	const totalDays = daysInMonth(cursor.y, cursor.m);
	const offset = mondayIndex(cursor.y, cursor.m);
	const remainder = (offset + totalDays) % 7;
	const trailing = remainder === 0 ? 0 : 7 - remainder;
	const cells = Array.from(
		{ length: offset + totalDays + trailing },
		(_, index) => {
			if (index < offset || index >= offset + totalDays) {
				return null;
			}
			return index - offset + 1;
		},
	);

	function shift(delta: number) {
		setCursor((current) => {
			const next = current.m + delta;
			if (next < 1) {
				return { y: current.y - 1, m: 12 };
			}
			if (next > 12) {
				return { y: current.y + 1, m: 1 };
			}
			return { y: current.y, m: next };
		});
	}

	return (
		<div className="mx-auto w-full overflow-hidden rounded-xl border border-border bg-card">
			<div className="flex items-center justify-between border-b border-border px-4 py-3">
				<p className="font-heading text-sm font-medium">
					{MONTHS[cursor.m - 1]} {cursor.y}
				</p>
				<div className="flex gap-1">
					<Button
						type="button"
						variant="ghost"
						size="icon-sm"
						onClick={() => shift(-1)}
						aria-label="Bulan sebelumnya"
					>
						<ChevronLeft />
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="icon-sm"
						onClick={() => shift(1)}
						aria-label="Bulan berikutnya"
					>
						<ChevronRight />
					</Button>
				</div>
			</div>
			<div className="grid grid-cols-7 border-b border-border text-center text-xs text-muted-foreground">
				{WEEKDAYS.map((day) => (
					<div
						key={day}
						className="border-r border-border py-2 font-medium nth-[7n]:border-r-0"
					>
						{day}
					</div>
				))}
			</div>
			<div className="grid grid-cols-7">
				{cells.map((day, index) => {
					if (day === null) {
						return (
							<div
								key={`empty-${index}`}
								className="aspect-square border-r border-b border-border bg-muted/30 nth-[7n]:border-r-0"
							/>
						);
					}
					const marked = eventDays.has(day);
					const titles = eventDays
						.get(day)
						?.map((item) => item.judul)
						.join(", ");
					return (
						<div
							key={day}
							title={titles}
							className={cn(
								"flex aspect-square items-center justify-center border-r border-b border-border text-sm nth-[7n]:border-r-0",
								marked
									? "bg-foreground font-medium text-background"
									: "bg-card text-foreground",
							)}
						>
							{day}
						</div>
					);
				})}
			</div>
		</div>
	);
}
