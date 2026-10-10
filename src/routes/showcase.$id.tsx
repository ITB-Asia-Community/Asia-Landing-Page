import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageShell } from "@/components/shared/PageShell";
import { ShareButton } from "@/components/shared/ShareButton";
import { Tag } from "@/components/shared/Tag";
import { showcaseList, useShowcaseById } from "@/lib/queries";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/showcase/$id")({
	head: ({ params }) => {
		const item = showcaseList.find((entry) => entry.id === params.id);
		return pageHead(
			item?.judul ?? "Project tidak ditemukan",
			item?.deskripsi ?? "Detail showcase ITB Asia Community.",
			item?.gambar,
		);
	},
	component: ShowcaseDetailPage,
});

function ShowcaseDetailPage() {
	const { id } = Route.useParams();
	const query = useShowcaseById(id);
	const item = query.data;

	if (query.isLoading) {
		return (
			<PageShell title="Memuat...">
				<p className="text-sm text-muted-foreground">Memuat project...</p>
			</PageShell>
		);
	}

	if (query.isError) {
		return (
			<PageShell title="Showcase">
				<ErrorState onRetry={() => void query.refetch()} />
			</PageShell>
		);
	}

	if (!item) {
		return (
			<PageShell title="Tidak ditemukan">
				<ErrorState
					title="Project tidak ditemukan"
					description="Item ini tidak ada di data dummy."
				/>
			</PageShell>
		);
	}

	return (
		<PageShell
			title={item.judul}
			description={item.deskripsi}
			actions={<ShareButton title={item.judul} />}
		>
			<Card>
				<img
					src={item.gambar}
					alt={item.judul}
					className="aspect-video w-full object-cover"
				/>
				<CardContent className="space-y-4 pt-6">
					<Badge variant="secondary">{item.kategori}</Badge>
					<p className="text-sm text-muted-foreground">
						Pembuat{" "}
						<Link
							to="/member/$id"
							params={{ id: item.pembuat }}
							className="underline-offset-4 hover:underline"
						>
							{item.pembuatNama}
						</Link>
					</p>
					<p className="text-sm leading-relaxed">{item.deskripsi}</p>
					<div className="flex flex-wrap gap-1">
						{item.tag.map((tag) => (
							<Tag key={tag} label={tag} />
						))}
					</div>
					<div className="flex flex-wrap gap-2">
						<Button asChild>
							<a href={item.link} target="_blank" rel="noreferrer">
								Lihat project
							</a>
						</Button>
						<Button asChild variant="outline">
							<Link to="/showcase">Kembali ke list</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</PageShell>
	);
}
