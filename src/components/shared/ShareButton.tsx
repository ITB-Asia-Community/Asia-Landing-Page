import { useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonProps {
	title: string;
	url?: string;
}

export function ShareButton({ title, url }: ShareButtonProps) {
	const [copied, setCopied] = useState(false);
	const shareUrl =
		url ?? (typeof window !== "undefined" ? window.location.href : "");
	const waHref = `https://wa.me/?text=${encodeURIComponent(`${title} ${shareUrl}`)}`;

	async function copyLink() {
		if (!shareUrl) {
			return;
		}
		await navigator.clipboard.writeText(shareUrl);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1500);
	}

	return (
		<div className="flex items-center gap-1">
			<Button
				type="button"
				variant="outline"
				size="sm"
				onClick={() => {
					void copyLink();
				}}
			>
				{copied ? (
					<Check data-icon="inline-start" />
				) : (
					<Link2 data-icon="inline-start" />
				)}
				{copied ? "Tersalin" : "Salin tautan"}
			</Button>
			<Button asChild variant="outline" size="sm">
				<a href={waHref} target="_blank" rel="noreferrer">
					<Share2 data-icon="inline-start" />
					WhatsApp
				</a>
			</Button>
		</div>
	);
}
