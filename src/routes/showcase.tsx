import { Link, createFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CardSkeleton } from "@/components/shared/CardSkeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { FilterBar } from "@/components/shared/FilterBar";
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
			crumbs={[{ label: "Home", to: "/" }, { label: "Showcase" }]}
		>
			<div className="mb-6 flex flex-col gap-3 sm:flex-row">
				<SearchBar value={search.query} onChange={search.setQuery} />
				<FilterBar
					categories={search.categories}
					value={search.category}
					onChange={search.setCategory}
				/>
			</div>
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
							<Card
								key={item.id}
								className="h-full overflow-hidden transition-colors hover:bg-muted/40"
							>
								<Link
									to="/showcase/$id"
									params={{ id: item.id }}
									className="block"
								>
									<img
										src={item.gambar}
										alt={item.judul}
										className="aspect-video w-full object-cover"
									/>
								</Link>
								<CardHeader>
									<CardTitle>
										<Link
											to="/showcase/$id"
											params={{ id: item.id }}
											className="hover:underline"
										>
											{item.judul}
										</Link>
									</CardTitle>
									<CardDescription>
										<Link
											to="/member/$id"
											params={{ id: item.pembuat }}
											className="underline-offset-4 hover:underline"
										>
											{item.pembuatNama}
										</Link>
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-3">
									<p className="line-clamp-2 text-sm text-muted-foreground">
										{item.deskripsi}
									</p>
									<div className="flex flex-wrap gap-1">
										{item.tag.map((tag) => (
											<Tag key={tag} label={tag} />
										))}
									</div>
								</CardContent>
							</Card>
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
