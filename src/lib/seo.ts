import { COMMUNITY_NAME, OG_IMAGE, SITE_URL } from "@/lib/constants";

export function pageHead(
	title: string,
	description: string,
	image: string = OG_IMAGE,
): {
	meta: Array<
		| { title: string }
		| { name: string; content: string }
		| { property: string; content: string }
	>;
} {
	const fullTitle = `${title} · ${COMMUNITY_NAME}`;
	return {
		meta: [
			{ title: fullTitle },
			{ name: "description", content: description },
			{ property: "og:title", content: fullTitle },
			{ property: "og:description", content: description },
			{ property: "og:image", content: image },
			{ property: "og:url", content: SITE_URL },
			{ name: "twitter:card", content: "summary_large_image" },
		],
	};
}
