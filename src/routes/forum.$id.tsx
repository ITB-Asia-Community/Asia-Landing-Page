import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageShell } from "@/components/shared/PageShell";
import { ShareButton } from "@/components/shared/ShareButton";
import { Tag } from "@/components/shared/Tag";
import { forumList, useForumById } from "@/lib/queries";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/forum/$id")({
	head: ({ params }) => {
		const item = forumList.find((entry) => entry.id === params.id);
		return pageHead(
			item?.judul ?? "Thread tidak ditemukan",
			item?.isi ?? "Detail thread forum ITB Asia Community.",
		);
	},
	component: ForumDetailPage,
});

function ForumDetailPage() {
	const { id } = Route.useParams();
	const query = useForumById(id);
	const item = query.data;

	if (query.isLoading) {
		return (
			<PageShell
				title="Memuat..."
				crumbs={[
					{ label: "Home", to: "/" },
					{ label: "Forum", to: "/forum" },
				]}
			>
				<p className="text-sm text-muted-foreground">Memuat thread...</p>
			</PageShell>
		);
	}

	if (query.isError) {
		return (
			<PageShell
				title="Forum"
				crumbs={[
					{ label: "Home", to: "/" },
					{ label: "Forum", to: "/forum" },
				]}
			>
				<ErrorState onRetry={() => void query.refetch()} />
			</PageShell>
		);
	}

	if (!item) {
		return (
			<PageShell
				title="Tidak ditemukan"
				crumbs={[
					{ label: "Home", to: "/" },
					{ label: "Forum", to: "/forum" },
				]}
			>
				<ErrorState
					title="Thread tidak ditemukan"
					description="Item ini tidak ada di data dummy."
				/>
			</PageShell>
		);
	}

	return (
		<PageShell
			title={item.judul}
			crumbs={[
				{ label: "Home", to: "/" },
				{ label: "Forum", to: "/forum" },
				{ label: item.judul },
			]}
			actions={<ShareButton title={item.judul} />}
		>
			<Card>
				<CardHeader>
					<p className="text-sm text-muted-foreground">
						Oleh{" "}
						<Link
							to="/member/$id"
							params={{ id: item.author }}
							className="underline-offset-4 hover:underline"
						>
							{item.authorNama}
						</Link>
						{" · "}
						{item.replyCount} reply
					</p>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-sm leading-relaxed">{item.isi}</p>
					<div className="flex flex-wrap gap-1">
						{item.tag.map((tag) => (
							<Tag key={tag} label={tag} />
						))}
					</div>
					<div className="rounded-lg border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">
						Reply coming soon
					</div>
					<Button asChild variant="outline">
						<Link to="/forum">Kembali ke list</Link>
					</Button>
				</CardContent>
			</Card>
		</PageShell>
	);
}
