import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Countdown } from "@/components/shared/Countdown";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageShell } from "@/components/shared/PageShell";
import { ShareButton } from "@/components/shared/ShareButton";
import { Tag } from "@/components/shared/Tag";
import { lombaList, useLombaById } from "@/lib/queries";
import { pageHead } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const Route = createFileRoute("/lomba/$id")({
	head: ({ params }) => {
		const item = lombaList.find((entry) => entry.id === params.id);
		return pageHead(
			item?.judul ?? "Lomba tidak ditemukan",
			item?.deskripsi ?? "Detail lomba ITB Asia Community.",
		);
	},
	component: LombaDetailPage,
});

function LombaDetailPage() {
	const { id } = Route.useParams();
	const query = useLombaById(id);
	const item = query.data;

	if (query.isLoading) {
		return (
			<PageShell
				title="Memuat..."
				crumbs={[
					{ label: "Home", to: "/" },
					{ label: "Lomba", to: "/lomba" },
				]}
			>
				<p className="text-sm text-muted-foreground">
					Memuat detail lomba...
				</p>
			</PageShell>
		);
	}

	if (query.isError) {
		return (
			<PageShell
				title="Lomba"
				crumbs={[
					{ label: "Home", to: "/" },
					{ label: "Lomba", to: "/lomba" },
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
					{ label: "Lomba", to: "/lomba" },
				]}
			>
				<ErrorState
					title="Lomba tidak ditemukan"
					description="Item ini tidak ada di data dummy."
				/>
			</PageShell>
		);
	}

	return (
		<PageShell
			title={item.judul}
			description={item.deskripsi}
			crumbs={[
				{ label: "Home", to: "/" },
				{ label: "Lomba", to: "/lomba" },
				{ label: item.judul },
			]}
			actions={<ShareButton title={item.judul} />}
		>
			<Card>
				<CardHeader className="flex flex-row flex-wrap items-center gap-2">
					<Badge variant="secondary">{item.kategori}</Badge>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-sm text-muted-foreground">
						Penyelenggara: {item.penyelenggara}
					</p>
					<p className="text-sm leading-relaxed">{item.deskripsi}</p>
					<p className="text-sm text-muted-foreground">
						Deadline {formatDate(item.deadline)} ·{" "}
						<Countdown deadline={item.deadline} />
					</p>
					<div className="flex flex-wrap gap-1">
						{item.tag.map((tag) => (
							<Tag key={tag} label={tag} />
						))}
					</div>
					<div className="flex flex-wrap gap-2 pt-2">
						<Button asChild>
							<a href={item.link} target="_blank" rel="noreferrer">
								Daftar
							</a>
						</Button>
						<Button asChild variant="outline">
							<Link to="/lomba">Kembali ke list</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</PageShell>
	);
}
