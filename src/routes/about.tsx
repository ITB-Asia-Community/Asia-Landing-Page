import { Navigate, createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
	head: () =>
		pageHead(
			"Beranda",
			"Wadah kolaborasi mahasiswa lintas jurusan untuk membangun bisnis bersama.",
		),
	component: AboutRedirect,
});

function AboutRedirect() {
	return <Navigate to="/" />;
}
