import { useState } from "react";
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
import { COMMUNITY_NAME, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
	const [open, setOpen] = useState(false);
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	return (
		<header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
			<nav className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
				<Link
					to="/"
					className="shrink-0 font-heading text-sm font-semibold tracking-tight"
				>
					{COMMUNITY_NAME}
				</Link>

				<div className="hidden items-center gap-1 lg:flex">
					{NAV_LINKS.map((item) => {
						const active =
							item.to === "/"
								? pathname === "/"
								: pathname === item.to ||
									pathname.startsWith(`${item.to}/`);
						return (
							<Link
								key={item.to}
								to={item.to}
								className={cn(
									"rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
									active && "bg-muted text-foreground",
								)}
							>
								{item.label}
							</Link>
						);
					})}
				</div>

				<div className="flex items-center gap-1">
					<ThemeToggle />
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="lg:hidden"
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
									const active =
										item.to === "/"
											? pathname === "/"
											: pathname === item.to ||
												pathname.startsWith(`${item.to}/`);
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
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	);
}
