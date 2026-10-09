import { Link, createFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CardSkeleton } from "@/components/shared/CardSkeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { EventCalendar } from "@/components/shared/EventCalendar";
import { FilterBar } from "@/components/shared/FilterBar";
import { PageShell } from "@/components/shared/PageShell";
import { Pagination } from "@/components/shared/Pagination";
import { SearchBar } from "@/components/shared/SearchBar";
import { SortSelect } from "@/components/shared/SortSelect";
import { StaggerGrid } from "@/components/shared/StaggerGrid";
import { Tag } from "@/components/shared/Tag";
import { useSearch } from "@/hooks/useSearch";
import { useEvent } from "@/lib/queries";
import { pageHead } from "@/lib/seo";
import type { Event } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export const Route = createFileRoute("/event")({
	head: () =>
		pageHead("Event", "Workshop, meetup, dan webinar komunitas ITB Asia."),
	component: EventPage,
});

function EventPage() {
	const query = useEvent();
	const data = query.data ?? [];
	const search = useSearch(data, {
		searchKeys: ["judul", "deskripsi"],
		filterKey: "kategori",
		sortFns: {
			tanggal: (a: Event, b: Event) => a.tanggal.localeCompare(b.tanggal),
			terbaru: (a: Event, b: Event) => b.tanggal.localeCompare(a.tanggal),
		},
		defaultSort: "tanggal",
	});

	return (
		<PageShell
			title="Event"
			description="Workshop, meetup, dan webinar. Tanggal bertanda di kalender punya event."
			crumbs={[{ label: "Home", to: "/" }, { label: "Event" }]}
		>
			{query.isLoading ? (
				<CardSkeleton count={3} />
			) : query.isError ? (
				<ErrorState onRetry={() => void query.refetch()} />
			) : (
				<>
					<div className="mb-8">
						<EventCalendar events={data} />
					</div>
					<div className="mb-6 flex flex-col gap-3 sm:flex-row">
						<SearchBar value={search.query} onChange={search.setQuery} />
						<FilterBar
							categories={search.categories}
							value={search.category}
							onChange={search.setCategory}
						/>
						<SortSelect
							value={search.sort}
							onChange={search.setSort}
							options={[
								{ value: "tanggal", label: "Tanggal terdekat" },
								{ value: "terbaru", label: "Terbaru" },
							]}
						/>
					</div>
					{search.total === 0 ? (
						<EmptyState
							description="Tidak ada event yang cocok."
							ctaLabel="Reset filter"
							onCta={() => {
								search.setQuery("");
								search.setCategory("all");
							}}
						/>
					) : (
						<>
							<StaggerGrid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
								{search.results.map((item) => (
									<Link
										key={item.id}
										to="/event/$id"
										params={{ id: item.id }}
										className="block h-full"
									>
										<Card className="h-full transition-colors hover:bg-muted/40">
											<CardHeader>
												<Badge variant="secondary">
													{item.kategori}
												</Badge>
												<CardTitle>{item.judul}</CardTitle>
												<CardDescription>
													{formatDate(item.tanggal)} ·{" "}
													{item.lokasi}
												</CardDescription>
											</CardHeader>
											<CardContent>
												<div className="flex flex-wrap gap-1">
													{item.tag.map((tag) => (
														<Tag key={tag} label={tag} />
													))}
												</div>
											</CardContent>
										</Card>
									</Link>
								))}
							</StaggerGrid>
							<div className="mt-8">
								<Pagination
									page={search.page}
									totalPages={search.totalPages}
									onPageChange={search.setPage}
								/>
							</div>
						</>
					)}
				</>
			)}
		</PageShell>
	);
}
