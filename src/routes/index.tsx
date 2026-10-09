import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Briefcase, Calendar, FolderKanban, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CardSkeleton } from "@/components/shared/CardSkeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import {
	COMMUNITY_NAME,
	DUMMY_PARTNER_COUNT,
	KAMPUS,
	TAGLINE,
	WA_GROUP_LINK,
} from "@/lib/constants";
import {
	useEvent,
	useFreelance,
	useLomba,
	useMember,
	useShowcase,
} from "@/lib/queries";
import { pageHead } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

const fadeUp = {
	hidden: { opacity: 0, y: 16 },
	show: { opacity: 1, y: 0 },
};

const stagger = {
	hidden: {},
	show: { transition: { staggerChildren: 0.08 } },
};

const features = [
	{
		to: "/freelance" as const,
		title: "Freelance",
		description: "Info pekerjaan lepas dari sesama mahasiswa.",
		icon: Briefcase,
	},
	{
		to: "/lomba" as const,
		title: "Lomba",
		description: "Kompetisi desain, bisnis, dan teknologi.",
		icon: Trophy,
	},
	{
		to: "/event" as const,
		title: "Event",
		description: "Workshop, meetup, dan webinar komunitas.",
		icon: Calendar,
	},
	{
		to: "/showcase" as const,
		title: "Showcase",
		description: "Lihat karya dan project kolaborasi member.",
		icon: FolderKanban,
	},
];

function HomePage() {
	const freelanceQuery = useFreelance();
	const lombaQuery = useLomba();
	const eventQuery = useEvent();
	const memberQuery = useMember();
	const showcaseQuery = useShowcase();

	const isLoading =
		freelanceQuery.isLoading ||
		lombaQuery.isLoading ||
		eventQuery.isLoading ||
		memberQuery.isLoading ||
		showcaseQuery.isLoading;

	const isError =
		freelanceQuery.isError ||
		lombaQuery.isError ||
		eventQuery.isError ||
		memberQuery.isError ||
		showcaseQuery.isError;

	const freelance = freelanceQuery.data ?? [];
	const lomba = lombaQuery.data ?? [];
	const events = eventQuery.data ?? [];
	const members = memberQuery.data ?? [];
	const showcases = showcaseQuery.data ?? [];

	const latestFreelance = [...freelance].sort((a, b) =>
		b.deadline.localeCompare(a.deadline),
	)[0];
	const latestLomba = [...lomba].sort((a, b) =>
		b.deadline.localeCompare(a.deadline),
	)[0];
	const latestEvent = [...events].sort((a, b) =>
		b.tanggal.localeCompare(a.tanggal),
	)[0];

	const highlights = [
		latestFreelance
			? {
					to: "/freelance" as const,
					kategori: "Freelance",
					judul: latestFreelance.judul,
					meta: `Deadline ${formatDate(latestFreelance.deadline)}`,
					deskripsi: latestFreelance.deskripsi,
				}
			: null,
		latestLomba
			? {
					to: "/lomba" as const,
					kategori: "Lomba",
					judul: latestLomba.judul,
					meta: `Deadline ${formatDate(latestLomba.deadline)}`,
					deskripsi: latestLomba.deskripsi,
				}
			: null,
		latestEvent
			? {
					to: "/event" as const,
					kategori: "Event",
					judul: latestEvent.judul,
					meta: `${formatDate(latestEvent.tanggal)} · ${latestEvent.lokasi}`,
					deskripsi: latestEvent.deskripsi,
				}
			: null,
	].filter((item) => item !== null);

	const stats = [
		{ label: "Member", value: members.length, icon: Users },
		{ label: "Project", value: showcases.length, icon: FolderKanban },
		{ label: "Event", value: events.length, icon: Calendar },
		{ label: "Partner", value: DUMMY_PARTNER_COUNT, icon: Briefcase },
	];

	return (
		<div>
			<section className="border-b border-border/60">
				<div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:py-24">
					<motion.div
						initial="hidden"
						animate="show"
						variants={stagger}
						className="max-w-2xl space-y-4"
					>
						<motion.p
							variants={fadeUp}
							className="text-sm text-muted-foreground"
						>
							{KAMPUS}
						</motion.p>
						<motion.h1
							variants={fadeUp}
							className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl"
						>
							{COMMUNITY_NAME}
						</motion.h1>
						<motion.p
							variants={fadeUp}
							className="text-lg text-muted-foreground"
						>
							{TAGLINE}
						</motion.p>
						<motion.p
							variants={fadeUp}
							className="text-sm leading-relaxed text-muted-foreground"
						>
							Wadah kolaborasi mahasiswa lintas jurusan untuk membangun
							bisnis bersama — info freelance, lomba, event, forum, dan
							showcase project.
						</motion.p>
						<motion.div variants={fadeUp}>
							<Button asChild size="lg">
								<a
									href={WA_GROUP_LINK}
									target="_blank"
									rel="noreferrer"
								>
									Gabung Komunitas
								</a>
							</Button>
						</motion.div>
					</motion.div>
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-4 py-14">
				<h2 className="font-heading text-xl font-semibold">
					Apa yang bisa kamu dapat
				</h2>
				<p className="mt-2 text-sm text-muted-foreground">
					Empat jalur kolaborasi yang bisa langsung kamu jelajahi.
				</p>
				<motion.div
					className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.2 }}
					variants={stagger}
				>
					{features.map((feature) => (
						<motion.div key={feature.to} variants={fadeUp}>
							<Link to={feature.to} className="block h-full">
								<Card className="h-full transition-colors hover:bg-muted/40">
									<CardHeader>
										<feature.icon className="size-5 text-muted-foreground" />
										<CardTitle>{feature.title}</CardTitle>
										<CardDescription>
											{feature.description}
										</CardDescription>
									</CardHeader>
								</Card>
							</Link>
						</motion.div>
					))}
				</motion.div>
			</section>

			<section className="border-y border-border/60 bg-muted/20">
				<div className="mx-auto max-w-6xl px-4 py-14">
					<h2 className="font-heading text-xl font-semibold">Highlight</h2>
					<p className="mt-2 text-sm text-muted-foreground">
						Item terbaru dari freelance, lomba, dan event.
					</p>
					{isLoading ? (
						<div className="mt-6">
							<CardSkeleton count={3} />
						</div>
					) : isError ? (
						<div className="mt-6">
							<ErrorState
								onRetry={() => {
									void freelanceQuery.refetch();
									void lombaQuery.refetch();
									void eventQuery.refetch();
								}}
							/>
						</div>
					) : (
						<motion.div
							className="mt-6 grid gap-4 md:grid-cols-3"
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, amount: 0.2 }}
							variants={stagger}
						>
							{highlights.map((item) => (
								<motion.div key={item.judul} variants={fadeUp}>
									<Link to={item.to} className="block h-full">
										<Card className="h-full transition-colors hover:bg-muted/40">
											<CardHeader>
												<CardDescription>
													{item.kategori}
												</CardDescription>
												<CardTitle>{item.judul}</CardTitle>
											</CardHeader>
											<CardContent className="space-y-2">
												<p className="text-xs text-muted-foreground">
													{item.meta}
												</p>
												<p className="line-clamp-3 text-sm text-muted-foreground">
													{item.deskripsi}
												</p>
											</CardContent>
										</Card>
									</Link>
								</motion.div>
							))}
						</motion.div>
					)}
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-4 py-14">
				<h2 className="font-heading text-xl font-semibold">
					Statistik Komunitas
				</h2>
				<p className="mt-2 text-sm text-muted-foreground">
					Gambaran singkat aktivitas komunitas saat ini.
				</p>
				<motion.div
					className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4"
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.2 }}
					variants={stagger}
				>
					{stats.map((stat) => (
						<motion.div key={stat.label} variants={fadeUp}>
							<Card>
								<CardHeader>
									<stat.icon className="size-4 text-muted-foreground" />
									<CardTitle className="text-3xl">
										{stat.value}
									</CardTitle>
									<CardDescription>{stat.label}</CardDescription>
								</CardHeader>
							</Card>
						</motion.div>
					))}
				</motion.div>
			</section>

			<section className="border-t border-border/60">
				<div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-16">
					<h2 className="font-heading text-xl font-semibold">
						Siap kolaborasi?
					</h2>
					<p className="max-w-xl text-sm text-muted-foreground">
						Gabung grup WhatsApp {COMMUNITY_NAME} untuk update freelance,
						lomba, event, dan ajakan project lintas jurusan.
					</p>
					<Button asChild size="lg">
						<a href={WA_GROUP_LINK} target="_blank" rel="noreferrer">
							Gabung Komunitas
						</a>
					</Button>
				</div>
			</section>
		</div>
	);
}

export const Route = createFileRoute("/")({
	head: () =>
		pageHead(
			"Beranda",
			"Wadah kolaborasi mahasiswa lintas jurusan untuk membangun bisnis bersama.",
		),
	component: HomePage,
});
