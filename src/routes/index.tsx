import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
	Briefcase,
	Calendar,
	Eye,
	FolderKanban,
	Handshake,
	Trophy,
	Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

const nilai = [
	{
		title: "Kolaborasi",
		body: "Lintas jurusan lebih kuat dari kerja sendiri. Kita bangun project bersama.",
		icon: Handshake,
	},
	{
		title: "Terbuka",
		body: "Info freelance, lomba, dan event dibagi transparan ke semua member.",
		icon: Eye,
	},
	{
		title: "Praktis",
		body: "Fokus aksi: portfolio, klien, kompetisi, dan bisnis kecil.",
		icon: Briefcase,
	},
	{
		title: "Saling bantu",
		body: "Yang sudah pernah jalan, bantu yang baru mulai.",
		icon: Users,
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
		{ label: "Member", value: members.length },
		{ label: "Project", value: showcases.length },
		{ label: "Event", value: events.length },
		{ label: "Partner", value: DUMMY_PARTNER_COUNT },
	];
	const chartConfig = {
		value: { label: "Jumlah", color: "var(--foreground)" },
	};

	return (
		<div>
			<section className="hero-surface relative isolate overflow-hidden border-b border-border">
				<div className="hero-grid pointer-events-none absolute inset-0" />
				<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
				<div className="relative mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-center px-4 pt-28 pb-20 sm:pt-32 sm:pb-28">
					<motion.div
						initial="hidden"
						animate="show"
						variants={stagger}
						className="max-w-2xl space-y-5"
					>
						<motion.p
							variants={fadeUp}
							className="inline-flex rounded-full border border-foreground/12 bg-background/50 px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground backdrop-blur-sm"
						>
							{KAMPUS}
						</motion.p>
						<motion.h1
							variants={fadeUp}
							className="font-heading text-4xl font-semibold tracking-tight sm:text-6xl"
						>
							{COMMUNITY_NAME}
						</motion.h1>
						<motion.p
							variants={fadeUp}
							className="text-xl text-foreground/80 sm:text-2xl"
						>
							{TAGLINE}
						</motion.p>
						<motion.p
							variants={fadeUp}
							className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
						>
							Wadah kolaborasi mahasiswa lintas jurusan untuk membangun
							bisnis bersama — info freelance, lomba, event, dan showcase
							project.
						</motion.p>
						<motion.div
							variants={fadeUp}
							className="flex flex-wrap gap-3 pt-1"
						>
							<Button asChild size="lg">
								<a
									href={WA_GROUP_LINK}
									target="_blank"
									rel="noreferrer"
								>
									Gabung Komunitas
								</a>
							</Button>
							<Button asChild size="lg" variant="outline">
								<Link to="/cara-gabung">Cara gabung</Link>
							</Button>
						</motion.div>
					</motion.div>
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-4 py-16">
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
								<Card className="h-full transition-colors hover:bg-muted/30">
									<CardHeader className="gap-3">
										<span className="flex size-9 items-center justify-center rounded-lg border border-border bg-muted/50">
											<feature.icon className="size-4 text-foreground" />
										</span>
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

			<section className="border-y border-border bg-muted/40">
				<div className="mx-auto max-w-6xl px-4 py-16">
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
										<Card className="h-full transition-colors hover:bg-muted/30">
											<CardHeader className="gap-2">
												<span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
													{item.kategori}
												</span>
												<CardTitle className="line-clamp-2 text-[15px] leading-snug">
													{item.judul}
												</CardTitle>
											</CardHeader>
											<CardContent className="space-y-2">
												<p className="text-xs text-muted-foreground">
													{item.meta}
												</p>
												<p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
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

			<section className="mx-auto max-w-6xl px-4 py-16">
				<h2 className="font-heading text-xl font-semibold">
					Tentang komunitas
				</h2>
				<p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
					{COMMUNITY_NAME} di {KAMPUS}. Tempat mahasiswa lintas jurusan
					ketemu, bukan organisasi resmi kampus.
				</p>
				<div className="mt-8 grid gap-10 lg:grid-cols-2">
					<div className="space-y-6">
						<div>
							<h3 className="font-heading text-sm font-semibold">
								Visi
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
								Menjadi wadah kolaborasi mahasiswa lintas jurusan untuk
								membangun bisnis, karya, dan karier bersama — di luar
								info internal kampus.
							</p>
						</div>
						<div>
							<h3 className="font-heading text-sm font-semibold">
								Misi
							</h3>
							<ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
								<li>
									Menyebarkan info freelance, lomba, dan event yang
									relevan.
								</li>
								<li>
									Menghubungkan mahasiswa yang ingin kolaborasi
									project.
								</li>
								<li>Menyediakan ruang showcase karya.</li>
								<li>Mendorong inisiatif bisnis kecil dari kampus.</li>
							</ul>
						</div>
						<div>
							<h3 className="font-heading text-sm font-semibold">
								Cerita
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
								Mahasiswa {KAMPUS} sering punya skill, tapi jarang
								ketemu rekan lintas jurusan. Desainer butuh developer,
								anak bisnis butuh product. Komunitas ini jadi tempat
								ketemu.
							</p>
						</div>
					</div>
					<div className="grid gap-4 sm:grid-cols-2">
						{nilai.map((item) => (
							<Card key={item.title}>
								<CardHeader className="gap-3">
									<span className="flex size-9 items-center justify-center rounded-lg border border-border bg-muted/50">
										<item.icon className="size-4 text-foreground" />
									</span>
									<CardTitle>{item.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm leading-relaxed text-muted-foreground">
										{item.body}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			<section className="border-y border-border bg-muted/40">
				<div className="mx-auto max-w-6xl px-4 py-16">
					<h2 className="font-heading text-xl font-semibold">
						Statistik komunitas
					</h2>
					<p className="mt-2 text-sm text-muted-foreground">
						Gambaran singkat aktivitas komunitas saat ini.
					</p>
					<motion.div
						className="mt-8 overflow-hidden rounded-xl border border-border bg-card p-4 sm:p-6"
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, amount: 0.2 }}
						variants={fadeUp}
					>
						<ChartContainer
							config={chartConfig}
							className="aspect-[16/7] w-full"
						>
							<BarChart data={stats} accessibilityLayer>
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey="label"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<YAxis
									allowDecimals={false}
									tickLine={false}
									axisLine={false}
									width={28}
								/>
								<ChartTooltip
									content={<ChartTooltipContent hideLabel />}
								/>
								<Bar
									dataKey="value"
									fill="var(--color-value)"
									radius={[6, 6, 0, 0]}
									maxBarSize={64}
								/>
							</BarChart>
						</ChartContainer>
					</motion.div>
				</div>
			</section>

			<section>
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
