import { Link, createFileRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageShell } from "@/components/shared/PageShell";
import { ShareButton } from "@/components/shared/ShareButton";
import { Tag } from "@/components/shared/Tag";
import {
	memberList,
	useForum,
	useMemberById,
	useShowcase,
} from "@/lib/queries";
import { pageHead } from "@/lib/seo";

function initials(nama: string): string {
	return nama
		.split(" ")
		.slice(0, 2)
		.map((part) => part[0] ?? "")
		.join("")
		.toUpperCase();
}

export const Route = createFileRoute("/member/$id")({
	head: ({ params }) => {
		const item = memberList.find((entry) => entry.id === params.id);
		return pageHead(
			item?.nama ?? "Member tidak ditemukan",
			item?.bio ?? "Profil member ITB Asia Community.",
		);
	},
	component: MemberDetailPage,
});

function MemberDetailPage() {
	const { id } = Route.useParams();
	const query = useMemberById(id);
	const forumQuery = useForum();
	const showcaseQuery = useShowcase();
	const item = query.data;
	const threads = (forumQuery.data ?? []).filter(
		(thread) => thread.author === id,
	);
	const projects = (showcaseQuery.data ?? []).filter(
		(project) => project.pembuat === id,
	);

	if (query.isLoading) {
		return (
			<PageShell
				title="Memuat..."
				crumbs={[
					{ label: "Home", to: "/" },
					{ label: "Member", to: "/member" },
				]}
			>
				<p className="text-sm text-muted-foreground">Memuat profil...</p>
			</PageShell>
		);
	}

	if (query.isError) {
		return (
			<PageShell
				title="Member"
				crumbs={[
					{ label: "Home", to: "/" },
					{ label: "Member", to: "/member" },
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
					{ label: "Member", to: "/member" },
				]}
			>
				<ErrorState
					title="Member tidak ditemukan"
					description="Profil ini tidak ada di data dummy."
				/>
			</PageShell>
		);
	}

	return (
		<PageShell
			title={item.nama}
			description={item.bio}
			crumbs={[
				{ label: "Home", to: "/" },
				{ label: "Member", to: "/member" },
				{ label: item.nama },
			]}
			actions={<ShareButton title={item.nama} />}
		>
			<div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
				<Card>
					<CardHeader className="flex flex-row items-center gap-3">
						<Avatar size="lg">
							<AvatarFallback>{initials(item.nama)}</AvatarFallback>
						</Avatar>
						<div>
							<CardTitle>{item.nama}</CardTitle>
							<p className="text-sm text-muted-foreground">
								{item.jurusan}
							</p>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<p className="text-sm leading-relaxed">{item.bio}</p>
						<div className="flex flex-wrap gap-1">
							{item.skill.map((skill) => (
								<Tag key={skill} label={skill} />
							))}
						</div>
						<div className="flex flex-wrap gap-2">
							<Button asChild variant="outline" size="sm">
								<a href={item.github} target="_blank" rel="noreferrer">
									GitHub
								</a>
							</Button>
							<Button asChild variant="outline" size="sm">
								<a
									href={item.portfolio}
									target="_blank"
									rel="noreferrer"
								>
									Portfolio
								</a>
							</Button>
						</div>
					</CardContent>
				</Card>
				<div className="space-y-6">
					<section>
						<h2 className="mb-3 font-heading text-sm font-semibold">
							Thread forum
						</h2>
						{threads.length === 0 ? (
							<p className="text-sm text-muted-foreground">
								Belum ada thread.
							</p>
						) : (
							<ul className="space-y-2">
								{threads.map((thread) => (
									<li key={thread.id}>
										<Link
											to="/forum/$id"
											params={{ id: thread.id }}
											className="text-sm underline-offset-4 hover:underline"
										>
											{thread.judul}
										</Link>
									</li>
								))}
							</ul>
						)}
					</section>
					<section>
						<h2 className="mb-3 font-heading text-sm font-semibold">
							Project showcase
						</h2>
						{projects.length === 0 ? (
							<p className="text-sm text-muted-foreground">
								Belum ada project.
							</p>
						) : (
							<ul className="space-y-2">
								{projects.map((project) => (
									<li key={project.id}>
										<Link
											to="/showcase/$id"
											params={{ id: project.id }}
											className="text-sm underline-offset-4 hover:underline"
										>
											{project.judul}
										</Link>
									</li>
								))}
							</ul>
						)}
					</section>
				</div>
			</div>
		</PageShell>
	);
}
