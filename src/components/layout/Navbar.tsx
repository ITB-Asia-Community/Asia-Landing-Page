import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { COMMUNITY_NAME, NAV_LINKS, WA_GROUP_LINK } from "@/lib/constants";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, to: string): boolean {
	if (to === "/") {
		return pathname === "/";
	}
	return pathname === to || pathname.startsWith(`${to}/`);
}

export function Navbar() {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	useEffect(() => {
		const onScroll = () => {
			setScrolled(window.scrollY > 16);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header
			className={cn(
				"fixed top-0 right-0 left-0 z-40 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
				scrolled
					? "border-b border-border/70 bg-background/80 shadow-[0_1px_0_0_var(--border)] backdrop-blur-xl"
					: "border-b border-transparent bg-transparent",
			)}
		>
			<nav className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4">
				<Link to="/" className="flex shrink-0 items-center gap-2.5">
					<span className="flex size-8 items-center justify-center rounded-md bg-foreground text-[11px] font-semibold tracking-tight text-background">
						IA
					</span>
					<span className="font-heading text-sm font-semibold tracking-tight">
						{COMMUNITY_NAME}
					</span>
				</Link>

				<div className="hidden flex-1 items-center justify-center gap-1 md:flex">
					{NAV_LINKS.map((item) => {
						const active = isActivePath(pathname, item.to);
						return (
							<Link
								key={item.to}
								to={item.to}
								className={cn(
									"rounded-full px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground",
									active && "bg-foreground/10 text-foreground",
								)}
							>
								{item.label}
							</Link>
						);
					})}
				</div>

				<div className="ml-auto flex items-center gap-2">
					<Button asChild size="sm" className="hidden sm:inline-flex">
						<a href={WA_GROUP_LINK} target="_blank" rel="noreferrer">
							Gabung
						</a>
					</Button>
					<ThemeToggle />
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="md:hidden"
								aria-label="Buka menu"
							>
								<Menu />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-72">
							<SheetHeader>
								<SheetTitle>{COMMUNITY_NAME}</SheetTitle>
							</SheetHeader>
							<div className="flex flex-col gap-1 px-4">
								{NAV_LINKS.map((item) => {
									const active = isActivePath(pathname, item.to);
									return (
										<Link
											key={item.to}
											to={item.to}
											onClick={() => setOpen(false)}
											className={cn(
												"rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
												active && "bg-muted text-foreground",
											)}
										>
											{item.label}
										</Link>
									);
								})}
								<a
									href={WA_GROUP_LINK}
									target="_blank"
									rel="noreferrer"
									className="mt-3 rounded-md bg-foreground px-3 py-2 text-center text-sm font-medium text-background"
									onClick={() => setOpen(false)}
								>
									Gabung Komunitas
								</a>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	);
}
