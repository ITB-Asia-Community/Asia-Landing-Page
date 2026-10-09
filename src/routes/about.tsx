import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shared/PageShell";
import { COMMUNITY_NAME, KAMPUS, TAGLINE } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
	head: () =>
		pageHead(
			"About",
			`Tentang ${COMMUNITY_NAME}: visi, misi, cerita, dan nilai komunitas.`,
		),
	component: AboutPage,
});

const nilai = [
	{
		title: "Kolaborasi",
		body: "Lintas jurusan lebih kuat dari kerja sendiri. Kita bangun project bersama.",
	},
	{
		title: "Terbuka",
		body: "Info freelance, lomba, dan event dibagi transparan ke semua member.",
	},
	{
		title: "Praktis",
		body: "Fokus aksi: portfolio, klien, kompetisi, dan bisnis kecil — bukan formalitas.",
	},
	{
		title: "Saling bantu",
		body: "Yang sudah pernah jalan, bantu yang baru mulai.",
	},
];

function AboutPage() {
	return (
		<PageShell
			title="About"
			description={`${COMMUNITY_NAME} di ${KAMPUS}. ${TAGLINE}.`}
			crumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
		>
			<div className="space-y-10">
				<section className="max-w-2xl space-y-3">
					<h2 className="font-heading text-lg font-semibold">Visi</h2>
					<p className="text-sm leading-relaxed text-muted-foreground">
						Menjadi wadah kolaborasi mahasiswa lintas jurusan untuk
						membangun bisnis, karya, dan karier bersama — di luar info
						internal kampus.
					</p>
				</section>
				<section className="max-w-2xl space-y-3">
					<h2 className="font-heading text-lg font-semibold">Misi</h2>
					<ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
						<li>
							Menyebarkan info freelance, lomba, dan event yang relevan.
						</li>
						<li>
							Menghubungkan mahasiswa yang ingin kolaborasi project.
						</li>
						<li>Menyediakan ruang forum dan showcase karya.</li>
						<li>Mendorong inisiatif bisnis kecil dari kampus.</li>
					</ul>
				</section>
				<section className="max-w-2xl space-y-3">
					<h2 className="font-heading text-lg font-semibold">
						Cerita komunitas
					</h2>
					<p className="text-sm leading-relaxed text-muted-foreground">
						{COMMUNITY_NAME} lahir dari kebutuhan sederhana: mahasiswa{" "}
						{KAMPUS} sering punya skill, tapi jarang ketemu rekan lintas
						jurusan. Desainer butuh developer, anak bisnis butuh product,
						writer butuh editor. Komunitas ini jadi tempat ketemu, bukan
						organisasi resmi kampus.
					</p>
				</section>
				<section>
					<h2 className="mb-4 font-heading text-lg font-semibold">
						Nilai-nilai
					</h2>
					<div className="grid gap-4 sm:grid-cols-2">
						{nilai.map((item) => (
							<Card key={item.title}>
								<CardHeader>
									<CardTitle>{item.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground">
										{item.body}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</section>
			</div>
		</PageShell>
	);
}
