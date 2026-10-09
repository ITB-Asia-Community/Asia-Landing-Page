import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "theme";

function readStoredTheme(): Theme {
	if (typeof window === "undefined") {
		return "dark";
	}
	const stored = window.localStorage.getItem(STORAGE_KEY);
	return stored === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme): void {
	const root = document.documentElement;
	if (theme === "dark") {
		root.classList.add("dark");
	} else {
		root.classList.remove("dark");
	}
}

export function useTheme(): {
	theme: Theme;
	toggleTheme: () => void;
	setTheme: (theme: Theme) => void;
} {
	const [theme, setThemeState] = useState<Theme>(readStoredTheme);

	useEffect(() => {
		applyTheme(theme);
		window.localStorage.setItem(STORAGE_KEY, theme);
	}, [theme]);

	const setTheme = useCallback((next: Theme) => {
		setThemeState(next);
	}, []);

	const toggleTheme = useCallback(() => {
		setThemeState((current) => (current === "dark" ? "light" : "dark"));
	}, []);

	return { theme, toggleTheme, setTheme };
}
