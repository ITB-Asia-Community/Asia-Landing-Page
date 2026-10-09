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
import { PageShell } from "@/components/shared/PageShell";
import { Pagination } from "@/components/shared/Pagination";
import { SearchBar } from "@/components/shared/SearchBar";
import { SortSelect } from "@/components/shared/SortSelect";
import { StaggerGrid } from "@/components/shared/StaggerGrid";
import { Tag } from "@/components/shared/Tag";
import { useSearch } from "@/hooks/useSearch";
import { useForum } from "@/lib/queries";
import { pageHead } from "@/lib/seo";
import type { ForumThread } from "@/lib/types";

export const Route = createFileRoute("/forum")({
	head: () =>
		pageHead(
			"Forum",
			"Diskusi mahasiswa lintas jurusan di ITB Asia Community.",
		),
	component: ForumPage,
});

function ForumPage() {
	const query = useForum();
	const data = query.data ?? [];
	const search = useSearch(data, {
		searchKeys: ["judul", "isi"],
		sortFns: {
			terbaru: (a: ForumThread, b: ForumThread) => b.id.localeCompare(a.id),
			reply: (a: ForumThread, b: ForumThread) => b.replyCount - a.replyCount,
		},
		defaultSort: "terbaru",
	});

	return (
		<PageShell
			title="Forum"
			description="Thread diskusi komunitas. Urutkan terbaru atau reply terbanyak."
			crumbs={[{ label: "Home", to: "/" }, { label: "Forum" }]}
		>
			<div className="mb-6 flex flex-col gap-3 sm:flex-row">
				<SearchBar
					value={search.query}
					onChange={search.setQuery}
					placeholder="Cari judul atau isi thread..."
				/>
				<SortSelect
					value={search.sort}
					onChange={search.setSort}
					options={[
						{ value: "terbaru", label: "Terbaru" },
						{ value: "reply", label: "Reply terbanyak" },
					]}
				/>
			</div>
			{query.isLoading ? (
				<CardSkeleton />
			) : query.isError ? (
				<ErrorState onRetry={() => void query.refetch()} />
			) : search.total === 0 ? (
				<EmptyState
					description="Tidak ada thread yang cocok."
					ctaLabel="Reset pencarian"
					onCta={() => search.setQuery("")}
				/>
			) : (
				<>
					<StaggerGrid className="grid gap-4 sm:grid-cols-2">
						{search.results.map((item) => (
							<Card
								key={item.id}
								className="h-full transition-colors hover:bg-muted/40"
							>
								<CardHeader>
									<CardTitle>
										<Link
											to="/forum/$id"
											params={{ id: item.id }}
											className="hover:underline"
										>
											{item.judul}
										</Link>
									</CardTitle>
									<CardDescription>
										<Link
											to="/member/$id"
											params={{ id: item.author }}
											className="underline-offset-4 hover:underline"
										>
											{item.authorNama}
										</Link>
										{" · "}
										{item.replyCount} reply
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
