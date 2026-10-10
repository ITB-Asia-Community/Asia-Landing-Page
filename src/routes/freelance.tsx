import { Link, createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardSkeleton } from "@/components/shared/CardSkeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { FilterBar } from "@/components/shared/FilterBar";
import { FilterToolbar } from "@/components/shared/FilterToolbar";
import { PageShell } from "@/components/shared/PageShell";
import { Pagination } from "@/components/shared/Pagination";
import { SearchBar } from "@/components/shared/SearchBar";
import { SortSelect } from "@/components/shared/SortSelect";
import { StaggerGrid } from "@/components/shared/StaggerGrid";
import { Tag } from "@/components/shared/Tag";
import { useSearch } from "@/hooks/useSearch";
import { useFreelance } from "@/lib/queries";
import { pageHead } from "@/lib/seo";
import type { Freelance } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export const Route = createFileRoute("/freelance")({
	head: () =>
		pageHead(
			"Freelance",
			"Info pekerjaan lepas dari sesama mahasiswa ITB Asia Community.",
		),
	component: FreelancePage,
});

function FreelancePage() {
	const query = useFreelance();
	const data = query.data ?? [];
	const search = useSearch(data, {
		searchKeys: ["judul", "deskripsi"],
		filterKey: "kategori",
		sortFns: {
			terbaru: (a: Freelance, b: Freelance) => b.id.localeCompare(a.id),
			deadline: (a: Freelance, b: Freelance) =>
				a.deadline.localeCompare(b.deadline),
		},
		defaultSort: "terbaru",
	});

	return (
		<PageShell
			title="Freelance"
			description="Pekerjaan lepas dari komunitas. Cari, filter, dan urutkan deadline."
		>
			<FilterToolbar>
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
						{ value: "terbaru", label: "Terbaru" },
						{ value: "deadline", label: "Deadline terdekat" },
					]}
				/>
			</FilterToolbar>
			{query.isLoading ? (
				<CardSkeleton />
			) : query.isError ? (
				<ErrorState onRetry={() => void query.refetch()} />
			) : search.total === 0 ? (
				<EmptyState
					description="Tidak ada freelance yang cocok dengan pencarian."
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
								to="/freelance/$id"
								params={{ id: item.id }}
								className="block h-full"
							>
								<Card className="h-full overflow-hidden py-0 transition-colors hover:bg-muted/30">
									<img
										src={item.gambar}
										alt={item.judul}
										className="aspect-[16/10] w-full object-cover"
									/>
									<CardHeader className="gap-2 pt-4">
										<div className="flex items-center justify-between gap-3">
											<span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
												{item.kategori}
											</span>
											<span className="text-xs tabular-nums text-muted-foreground">
												{formatDate(item.deadline)}
											</span>
										</div>
										<CardTitle className="line-clamp-2 text-[15px] leading-snug">
											{item.judul}
										</CardTitle>
									</CardHeader>
									<CardContent className="mt-auto space-y-3 pb-5">
										<p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
											{item.deskripsi}
										</p>
										<div className="flex flex-wrap gap-1.5">
											{item.tag.map((tag) => (
												<Tag key={tag} label={tag} />
											))}
										</div>
									</CardContent>
								</Card>
							</Link>
						))}
					</StaggerGrid>
					<div className="mt-10">
						<Pagination
							page={search.page}
							totalPages={search.totalPages}
							onPageChange={search.setPage}
						/>
					</div>
				</>
			)}
		</PageShell>
	);
}
