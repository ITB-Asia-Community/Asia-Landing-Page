import {
	HeadContent,
	Outlet,
	createRootRoute,
	useRouterState,
} from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { NotFound } from "@/components/layout/NotFound";
import { pageHead } from "@/lib/seo";

function RootLayout() {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	return (
		<div className="flex min-h-screen flex-col bg-background text-foreground">
			<HeadContent />
			<Navbar />
			<main className="flex-1">
				<motion.div
					key={pathname}
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -8 }}
					transition={{ duration: 0.25, ease: "easeOut" }}
				>
					<Outlet />
				</motion.div>
			</main>
			<Footer />
		</div>
	);
}

export const Route = createRootRoute({
	head: () =>
		pageHead(
			"Beranda",
			"Wadah kolaborasi mahasiswa lintas jurusan untuk membangun bisnis bersama.",
		),
	component: RootLayout,
	notFoundComponent: NotFound,
});
