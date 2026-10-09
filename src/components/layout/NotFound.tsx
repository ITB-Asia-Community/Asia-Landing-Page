import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function NotFound() {
	return (
		<div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center gap-4 px-4 text-center">
			<p className="text-sm text-muted-foreground">404</p>
			<h1 className="font-heading text-2xl font-semibold">
				Halaman tidak ditemukan
			</h1>
			<p className="max-w-md text-sm text-muted-foreground">
				Halaman yang kamu cari tidak ada atau sudah dipindahkan.
			</p>
			<Button asChild>
				<Link to="/">Kembali ke Home</Link>
			</Button>
		</div>
	);
}
