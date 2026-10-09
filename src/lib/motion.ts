export const fadeUp = {
	hidden: { opacity: 0, y: 16 },
	show: { opacity: 1, y: 0 },
};

export const stagger = {
	hidden: {},
	show: { transition: { staggerChildren: 0.08 } },
};
