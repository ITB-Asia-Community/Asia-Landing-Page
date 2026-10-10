import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	COMMUNITY_NAME,
	FOOTER_LINKS,
	KAMPUS,
	TAGLINE,
	WA_GROUP_LINK,
} from "@/lib/constants";

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-auto border-t border-border bg-muted/40">
			<div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
				<div>
					<Link to="/" className="inline-flex items-center gap-2.5">
						<span className="flex size-8 items-center justify-center rounded-md bg-foreground text-[11px] font-semibold tracking-tight text-background">
							IA
						</span>
						<p className="font-heading text-sm font-semibold">
							{COMMUNITY_NAME}
						</p>
					</Link>
					<p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
						{TAGLINE}
					</p>
					<p className="mt-1 text-xs text-muted-foreground">{KAMPUS}</p>
					<Button asChild size="sm" className="mt-5">
						<a href={WA_GROUP_LINK} target="_blank" rel="noreferrer">
							Gabung Komunitas
						</a>
					</Button>
				</div>
				<div>
					<p className="mb-4 text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
						Jelajahi
					</p>
					<ul className="space-y-2.5">
						{FOOTER_LINKS.jelajahi.map((item) => (
							<li key={item.to}>
								<Link
									to={item.to}
									className="text-sm text-foreground/70 transition-colors hover:text-foreground"
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div>
					<p className="mb-4 text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
						Komunitas
					</p>
					<ul className="space-y-2.5">
						{FOOTER_LINKS.komunitas.map((item) => (
							<li key={item.to}>
								<Link
									to={item.to}
									className="text-sm text-foreground/70 transition-colors hover:text-foreground"
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="border-t border-border/80">
				<div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
					<p className="text-xs text-muted-foreground">
						Copyright {year} {COMMUNITY_NAME}
					</p>
					<span className="flex gap-5">
						<p className="text-xs text-muted-foreground">
							Privacy Policy
						</p>
						<p className="text-xs text-muted-foreground">
							Terms of Service
						</p>
					</span>
				</div>
			</div>
		</footer>
	);
}
