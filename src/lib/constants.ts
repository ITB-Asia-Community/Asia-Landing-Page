export const WA_GROUP_LINK = "https://chat.whatsapp.com/XXXXXXXXXXXXX";
export const COMMUNITY_NAME = "ITB Asia Community";
export const TAGLINE = "Kolaborasi Mahasiswa Lintas Jurusan";
export const KAMPUS = "ITB Asia Malang";
export const DUMMY_PARTNER_COUNT = 8;
export const SITE_URL = "https://itbasia.community";
export const OG_IMAGE =
	"https://placehold.co/1200x630/1a1a1a/ffffff?text=ITB+Asia+Community";

export const MEMBER_WA: Record<string, string> = {
	"mbr-001": "6281234567890",
	"mbr-002": "6281234567891",
	"mbr-003": "6281234567892",
	"mbr-004": "6281234567893",
};

export const NAV_LINKS = [
	{ to: "/", label: "Home" },
	{ to: "/freelance", label: "Freelance" },
	{ to: "/lomba", label: "Lomba" },
	{ to: "/event", label: "Event" },
	{ to: "/showcase", label: "Showcase" },
	{ to: "/member", label: "Member" },
] as const;

export const FOOTER_LINKS = {
	jelajahi: [
		{ to: "/freelance", label: "Freelance" },
		{ to: "/lomba", label: "Lomba" },
		{ to: "/event", label: "Event" },
		{ to: "/showcase", label: "Showcase" },
		{ to: "/member", label: "Member" },
	],
	komunitas: [
		{ to: "/kolaborator", label: "Kolaborator" },
		{ to: "/cara-gabung", label: "Cara Gabung" },
	],
} as const;
