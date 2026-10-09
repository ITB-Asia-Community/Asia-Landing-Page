import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "@/components/layout/NotFound";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/404")({
	head: () =>
		pageHead("Halaman tidak ditemukan", "Halaman yang kamu cari tidak ada."),
	component: NotFound,
});
