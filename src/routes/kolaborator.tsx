import { Link, createFileRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { FilterToolbar } from "@/components/shared/FilterToolbar";
import { PageShell } from "@/components/shared/PageShell";
import { StaggerGrid } from "@/components/shared/StaggerGrid";
import { Tag } from "@/components/shared/Tag";
import { MEMBER_WA } from "@/lib/constants";
import { useMember } from "@/lib/queries";
import { pageHead } from "@/lib/seo";
import { useMemo, useState } from "react";

function initials(nama: string): string {
	return nama
		.split(" ")
		.slice(0, 2)
		.map((part) => part[0] ?? "")
		.join("")
		.toUpperCase();
}

export const Route = createFileRoute("/kolaborator")({
	head: () =>
		pageHead(
			"Cari Kolaborator",
			"Temukan member berdasarkan skill dan jurusan untuk project bersama.",
		),
	component: KolaboratorPage,
});

function KolaboratorPage() {
	const query = useMember();
	const data = query.data ?? [];
	const [jurusan, setJurusan] = useState("all");
	const [skill, setSkill] = useState("all");

	const jurusanOptions = useMemo(
		() => Array.from(new Set(data.map((item) => item.jurusan))).sort(),
		[data],
	);
	const skillOptions = useMemo(
		() => Array.from(new Set(data.flatMap((item) => item.skill))).sort(),
		[data],
	);

	const matched = data.filter((item) => {
		const jurusanOk = jurusan === "all" || item.jurusan === jurusan;
		const skillOk = skill === "all" || item.skill.includes(skill);
		return jurusanOk && skillOk;
	});

	return (
		<PageShell
			title="Cari Kolaborator"
			description="Filter member berdasarkan skill dan jurusan, lalu hubungi via WhatsApp."
		>
			<FilterToolbar>
				<FilterBar
					categories={jurusanOptions}
					value={jurusan}
					onChange={setJurusan}
					placeholder="Semua jurusan"
				/>
				<FilterBar
					categories={skillOptions}
					value={skill}
					onChange={setSkill}
					placeholder="Semua skill"
				/>
			</FilterToolbar>
			{query.isLoading ? (
				<CardSkeleton />
			) : query.isError ? (
				<ErrorState onRetry={() => void query.refetch()} />
			) : matched.length === 0 ? (
				<EmptyState
					description="Tidak ada member yang cocok dengan filter."
					ctaLabel="Reset filter"
					onCta={() => {
						setJurusan("all");
						setSkill("all");
					}}
				/>
			) : (
				<StaggerGrid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{matched.map((item) => {
						const wa = MEMBER_WA[item.id] ?? "6281234567890";
						return (
							<Card
								key={item.id}
								className="h-full transition-colors hover:bg-muted/30"
							>
								<CardHeader className="flex flex-row items-center gap-3">
									<Avatar>
										<AvatarFallback>
											{initials(item.nama)}
										</AvatarFallback>
									</Avatar>
									<div>
										<CardTitle>
											<Link
												to="/member/$id"
												params={{ id: item.id }}
												className="hover:underline"
											>
												{item.nama}
											</Link>
										</CardTitle>
										<CardDescription>{item.jurusan}</CardDescription>
									</div>
								</CardHeader>
								<CardContent className="space-y-3">
									<div className="flex flex-wrap gap-1">
										{item.skill.map((label) => (
											<Tag key={label} label={label} />
										))}
									</div>
									<Button asChild size="sm">
										<a
											href={`https://wa.me/${wa}`}
											target="_blank"
											rel="noreferrer"
										>
											Hubungi via WA
										</a>
									</Button>
								</CardContent>
							</Card>
						);
					})}
				</StaggerGrid>
			)}
		</PageShell>
	);
}
