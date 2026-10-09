import { Link, createFileRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { useMember } from "@/lib/queries";
import { pageHead } from "@/lib/seo";

function initials(nama: string): string {
	return nama
		.split(" ")
		.slice(0, 2)
		.map((part) => part[0] ?? "")
		.join("")
		.toUpperCase();
}

export const Route = createFileRoute("/member")({
	head: () =>
		pageHead("Member", "Mahasiswa lintas jurusan di ITB Asia Community."),
	component: MemberPage,
});

function MemberPage() {
	const query = useMember();
	const data = query.data ?? [];
	const search = useSearch(data, {
		searchKeys: ["nama"],
		filterKey: "jurusan",
	});

	return (
		<PageShell
			title="Member"
			description="Direktori member komunitas. Cari nama dan filter jurusan."
			crumbs={[{ label: "Home", to: "/" }, { label: "Member" }]}
		>
			<div className="mb-6 flex flex-col gap-3 sm:flex-row">
				<SearchBar
					value={search.query}
					onChange={search.setQuery}
					placeholder="Cari nama..."
				/>
				<FilterBar
					categories={search.categories}
					value={search.category}
					onChange={search.setCategory}
					placeholder="Semua jurusan"
				/>
			</div>
			{query.isLoading ? (
				<CardSkeleton />
			) : query.isError ? (
				<ErrorState onRetry={() => void query.refetch()} />
			) : search.total === 0 ? (
				<EmptyState
					description="Tidak ada member yang cocok."
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
								to="/member/$id"
								params={{ id: item.id }}
								className="block h-full"
							>
								<Card className="h-full transition-colors hover:bg-muted/40">
									<CardHeader className="flex flex-row items-center gap-3">
										<Avatar>
											<AvatarFallback>
												{initials(item.nama)}
											</AvatarFallback>
										</Avatar>
										<div>
											<CardTitle>{item.nama}</CardTitle>
											<CardDescription>
												{item.jurusan}
											</CardDescription>
										</div>
									</CardHeader>
									<CardContent>
										<div className="flex flex-wrap gap-1">
											{item.skill.map((skill) => (
												<Tag key={skill} label={skill} />
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
