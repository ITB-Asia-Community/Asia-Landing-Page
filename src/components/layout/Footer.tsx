import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	COMMUNITY_NAME,
	NAV_LINKS,
	TAGLINE,
	WA_GROUP_LINK,
} from "@/lib/constants";

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-auto border-t border-border/60 bg-background">
			<div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
				<div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
					<div className="max-w-sm space-y-2">
						<p className="font-heading text-sm font-semibold">
							{COMMUNITY_NAME}
						</p>
						<p className="text-sm text-muted-foreground">{TAGLINE}</p>
					</div>
					<div className="flex flex-wrap gap-x-4 gap-y-2">
						{NAV_LINKS.map((item) => (
							<Link
								key={item.to}
								to={item.to}
								className="text-sm text-muted-foreground transition-colors hover:text-foreground"
							>
								{item.label}
							</Link>
						))}
						<Link
							to="/kolaborator"
							className="text-sm text-muted-foreground transition-colors hover:text-foreground"
						>
							Kolaborator
						</Link>
						<Link
							to="/cara-gabung"
							className="text-sm text-muted-foreground transition-colors hover:text-foreground"
						>
							Cara Gabung
						</Link>
					</div>
					<Button asChild>
						<a href={WA_GROUP_LINK} target="_blank" rel="noreferrer">
							Gabung Komunitas
						</a>
					</Button>
				</div>
				<Separator />
				<p className="text-xs text-muted-foreground">
					Copyright {year} {COMMUNITY_NAME}. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
