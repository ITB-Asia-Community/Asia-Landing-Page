import { createFileRoute } from "@tanstack/react-router";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shared/PageShell";
import { COMMUNITY_NAME, WA_GROUP_LINK } from "@/lib/constants";
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
		n: "1",
		title: "Klik tautan grup",
		body: "Buka tautan WhatsApp grup komunitas lewat tombol di halaman ini.",
	},
	{
		n: "2",
		title: "Isi perkenalan singkat",
		body: "Tulis nama, jurusan, dan skill yang bisa kamu tawarkan ke kolaborasi.",
	},
	{
		n: "3",
		title: "Mulai terlibat",
		body: "Cek freelance, lomba, event, atau ajak kolaborasi lewat showcase dan member.",
	},
];

const faqs = [
	{
		q: "Apakah harus mahasiswa ITB Asia?",
		a: "Fokus utamanya mahasiswa ITB Asia Malang, tapi kolaborator lintas kampus tetap diterima selama niatnya jelas.",
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
		a: "Bukan. Ini wadah independen mahasiswa, bukan kanal info internal kampus.",
	},
];

function CaraGabungPage() {
	return (
		<PageShell
			title="Cara Gabung"
			description="Tiga langkah masuk komunitas, lalu mulai kolaborasi."
		>
			<div className="grid gap-4 md:grid-cols-3">
				{steps.map((step) => (
					<Card key={step.n}>
						<CardHeader>
							<p className="text-xs text-muted-foreground">
								Langkah {step.n}
							</p>
							<CardTitle>{step.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground">
								{step.body}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
			<div className="mt-8">
				<Button asChild size="lg">
					<a href={WA_GROUP_LINK} target="_blank" rel="noreferrer">
						Gabung Grup WhatsApp
					</a>
				</Button>
			</div>
			<section className="mt-12 max-w-2xl">
				<h2 className="mb-4 font-heading text-lg font-semibold">FAQ</h2>
				<Accordion type="single" collapsible>
					{faqs.map((item) => (
						<AccordionItem key={item.q} value={item.q}>
							<AccordionTrigger>{item.q}</AccordionTrigger>
							<AccordionContent>{item.a}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</section>
		</PageShell>
	);
}
