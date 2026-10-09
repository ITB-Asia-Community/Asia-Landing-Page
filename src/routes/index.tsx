import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/landing/Home";

export const Route = createFileRoute("/")({
	component: Home,
});
