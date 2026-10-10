import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface StaggerGridProps {
	className?: string;
	children: ReactNode[];
}

export function StaggerGrid({ className, children }: StaggerGridProps) {
	return (
		<motion.div
			className={cn(className)}
			initial="hidden"
			animate="show"
			variants={stagger}
		>
			{children.map((child, index) => (
				<motion.div
					key={index}
					variants={fadeUp}
					whileHover={{ y: -2 }}
					transition={{ duration: 0.2 }}
					className="h-full"
				>
					{child}
				</motion.div>
			))}
		</motion.div>
	);
}
