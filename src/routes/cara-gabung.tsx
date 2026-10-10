import { createFileRoute } from "@tanstack/react-router";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/shared/PageShell";
import { COMMUNITY_NAME, KAMPUS, WA_GROUP_LINK } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/cara-gabung")({
	head: () =>
		pageHead(
			"Cara Gabung",
			`Langkah bergabung ke ${COMMUNITY_NAME} dan FAQ singkat.`,
		),
	component: CaraGabungPage,
});

const steps = [
	{
		n: "01",
		title: "Klik tautan grup",
		body: "Buka tautan WhatsApp grup komunitas lewat tombol di halaman ini.",
	},
	{
		n: "02",
		title: "Isi perkenalan singkat",
		body: "Tulis nama, jurusan, dan skill yang bisa kamu tawarkan ke kolaborasi.",
	},
	{
		n: "03",
		title: "Mulai terlibat",
		body: "Cek freelance, lomba, event, atau ajak kolaborasi lewat showcase dan member.",
	},
];

const faqs = [
	{
		q: "Apakah harus mahasiswa ITB Asia?",
		a: `Fokus utamanya mahasiswa ${KAMPUS}, tapi kolaborator lintas kampus tetap diterima selama niatnya jelas.`,
	},
	{
		q: "Ada biaya keanggotaan?",
		a: "Tidak. Komunitas ini gratis. Yang diminta hanya kontribusi: info, karya, atau bantuan ke member lain.",
	},
	{
		q: "Harus jago coding dulu?",
		a: "Tidak. Desain, bisnis, writing, video, dan skill lain sama pentingnya. Itu alasan komunitas ini lintas jurusan.",
	},
	{
		q: "Bagaimana cara posting freelance atau lomba?",
		a: "Untuk versi ini datanya dummy. Nanti info masuk lewat grup WA, lalu diangkat ke website.",
	},
	{
		q: "Apakah ini organisasi resmi kampus?",
		a: "Bukan. Ini wadah independen mahasiswa, bukan kanal info internal kampus. Jika disetujui, komunitas ini mungkin menjadi organisasi resmi kampus.",
	},
];

function CaraGabungPage() {
	return (
		<PageShell
			title="Cara Gabung"
			description="Tiga langkah masuk komunitas, lalu mulai kolaborasi."
		>
			<ol className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
				{steps.map((step) => (
					<li
						key={step.n}
						className="grid gap-3 px-5 py-5 sm:grid-cols-[4.5rem_1fr] sm:items-start sm:gap-6 sm:px-6"
					>
						<span className="font-heading text-sm font-medium tabular-nums text-muted-foreground">
							{step.n}
						</span>
						<div className="space-y-1.5">
							<h2 className="font-heading text-[15px] font-medium leading-snug">
								{step.title}
							</h2>
							<p className="text-sm leading-relaxed text-muted-foreground">
								{step.body}
							</p>
						</div>
					</li>
				))}
			</ol>

			<div className="mt-8 flex flex-col gap-3 rounded-xl border border-border bg-card px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
				<div className="space-y-1">
					<p className="font-heading text-[15px] font-medium">Siap masuk grup?</p>
					<p className="text-sm text-muted-foreground">
						Gabung WhatsApp {COMMUNITY_NAME}, lalu perkenalkan diri.
					</p>
				</div>
				<Button asChild size="lg" className="shrink-0">
					<a href={WA_GROUP_LINK} target="_blank" rel="noreferrer">
						Gabung Grup WhatsApp
					</a>
				</Button>
			</div>

			<section className="mt-14 max-w-3xl">
				<h2 className="mb-1 font-heading text-xl font-semibold">FAQ</h2>
				<p className="mb-5 text-sm text-muted-foreground">
					Jawaban singkat sebelum kamu gabung.
				</p>
				<Accordion
					type="single"
					collapsible
					className="rounded-xl border border-border bg-card px-5 sm:px-6"
				>
					{faqs.map((item) => (
						<AccordionItem key={item.q} value={item.q}>
							<AccordionTrigger className="py-4 hover:no-underline">
								{item.q}
							</AccordionTrigger>
							<AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
								{item.a}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</section>
		</PageShell>
	);
}
