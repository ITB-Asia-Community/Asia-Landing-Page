import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageShell } from "@/components/shared/PageShell";
import { ShareButton } from "@/components/shared/ShareButton";
import { Tag } from "@/components/shared/Tag";
import { eventList, useEventById } from "@/lib/queries";
import { pageHead } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const Route = createFileRoute("/event/$id")({
	head: ({ params }) => {
		const item = eventList.find((entry) => entry.id === params.id);
		return pageHead(
			item?.judul ?? "Event tidak ditemukan",
			item?.deskripsi ?? "Detail event ITB Asia Community.",
			item?.gambar,
		);
	},
	component: EventDetailPage,
});

function EventDetailPage() {
	const { id } = Route.useParams();
	const query = useEventById(id);
	const item = query.data;

	if (query.isLoading) {
		return (
			<PageShell title="Memuat...">
				<p className="text-sm text-muted-foreground">
					Memuat detail event...
				</p>
			</PageShell>
		);
	}

	if (query.isError) {
		return (
			<PageShell title="Event">
				<ErrorState onRetry={() => void query.refetch()} />
			</PageShell>
		);
	}

	if (!item) {
		return (
			<PageShell title="Tidak ditemukan">
				<ErrorState
					title="Event tidak ditemukan"
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
			<Card className="overflow-hidden py-0">
				<img
					src={item.gambar}
					alt={item.judul}
					className="aspect-[16/8] w-full object-cover"
				/>
				<CardHeader className="flex flex-row flex-wrap items-center gap-2 pt-5">
					<Badge variant="secondary">{item.kategori}</Badge>
				</CardHeader>
				<CardContent className="space-y-4 pb-6">
					<p className="text-sm text-muted-foreground">
						{formatDate(item.tanggal)} · {item.lokasi}
					</p>
					<p className="text-sm leading-relaxed">{item.deskripsi}</p>
					<div className="flex flex-wrap gap-1">
						{item.tag.map((tag) => (
							<Tag key={tag} label={tag} />
						))}
					</div>
					<Button asChild variant="outline">
						<Link to="/event">Kembali ke list</Link>
					</Button>
				</CardContent>
			</Card>
		</PageShell>
	);
}
