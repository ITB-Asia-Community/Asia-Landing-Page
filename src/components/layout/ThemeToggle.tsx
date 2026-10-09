import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();
	const isDark = theme === "dark";

	return (
		<Button
			type="button"
			variant="ghost"
			size="icon"
			onClick={toggleTheme}
			aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
		>
			{isDark ? <Sun /> : <Moon />}
		</Button>
	);
}
