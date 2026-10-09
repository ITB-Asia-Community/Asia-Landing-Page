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
import { FilterBar } from "@/components/shared/FilterBar";
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
			description="Pekerjaan lepas dari komunitas. Filter kategori, cari judul, dan urutkan deadline."
			crumbs={[{ label: "Home", to: "/" }, { label: "Freelance" }]}
		>
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
						{ value: "terbaru", label: "Terbaru" },
						{ value: "deadline", label: "Deadline terdekat" },
					]}
				/>
			</div>
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
								<Card className="h-full transition-colors hover:bg-muted/40">
									<CardHeader>
										<Badge variant="secondary">{item.kategori}</Badge>
										<CardTitle>{item.judul}</CardTitle>
										<CardDescription>
											Deadline {formatDate(item.deadline)}
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-3">
										<p className="line-clamp-3 text-sm text-muted-foreground">
											{item.deskripsi}
										</p>
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
		</PageShell>
	);
}
