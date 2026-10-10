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
import { StaggerGrid } from "@/components/shared/StaggerGrid";
import { Tag } from "@/components/shared/Tag";
import { useSearch } from "@/hooks/useSearch";
import { useShowcase } from "@/lib/queries";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/showcase")({
	head: () =>
		pageHead(
			"Showcase",
			"Karya dan project kolaborasi member ITB Asia Community.",
		),
	component: ShowcasePage,
});

function ShowcasePage() {
	const query = useShowcase();
	const data = query.data ?? [];
	const search = useSearch(data, {
		searchKeys: ["judul", "deskripsi"],
		filterKey: "kategori",
	});

	return (
		<PageShell
			title="Showcase"
			description="Project member komunitas. Filter kategori dan lihat detail karyanya."
		>
			<FilterToolbar>
				<SearchBar value={search.query} onChange={search.setQuery} />
				<FilterBar
					categories={search.categories}
					value={search.category}
					onChange={search.setCategory}
				/>
			</FilterToolbar>
			{query.isLoading ? (
				<CardSkeleton />
			) : query.isError ? (
				<ErrorState onRetry={() => void query.refetch()} />
			) : search.total === 0 ? (
				<EmptyState
					description="Tidak ada project yang cocok."
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
								to="/showcase/$id"
								params={{ id: item.id }}
								className="block h-full"
							>
								<Card className="h-full overflow-hidden py-0 transition-colors hover:bg-muted/30">
									<img
										src={item.gambar}
										alt={item.judul}
										className="aspect-[16/10] w-full object-cover"
									/>
									<CardHeader className="gap-1.5 pt-4">
										<CardTitle className="line-clamp-1 text-[15px] leading-snug">
											{item.judul}
										</CardTitle>
										<p className="text-xs text-muted-foreground">
											{item.pembuatNama}
										</p>
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
