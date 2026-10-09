import { useEffect, useState } from "react";

interface CountdownProps {
	deadline: string;
}

interface Remaining {
	expired: boolean;
	days: number;
	hours: number;
	minutes: number;
}

function getRemaining(deadline: string): Remaining {
	const target = new Date(`${deadline}T23:59:59`).getTime();
	const diff = target - Date.now();
	if (Number.isNaN(target) || diff <= 0) {
		return { expired: true, days: 0, hours: 0, minutes: 0 };
	}
	const days = Math.floor(diff / 86_400_000);
	const hours = Math.floor((diff % 86_400_000) / 3_600_000);
	const minutes = Math.floor((diff % 3_600_000) / 60_000);
	return { expired: false, days, hours, minutes };
}

export function Countdown({ deadline }: CountdownProps) {
	const [remaining, setRemaining] = useState<Remaining>(() =>
		getRemaining(deadline),
	);

	useEffect(() => {
		setRemaining(getRemaining(deadline));
		const timer = window.setInterval(() => {
			setRemaining(getRemaining(deadline));
		}, 60_000);
		return () => window.clearInterval(timer);
	}, [deadline]);

	if (remaining.expired) {
		return (
			<span className="text-xs text-muted-foreground">Deadline lewat</span>
		);
	}

	return (
		<span className="text-xs text-muted-foreground">
			{remaining.days}h {remaining.hours}j {remaining.minutes}m
		</span>
	);
}
