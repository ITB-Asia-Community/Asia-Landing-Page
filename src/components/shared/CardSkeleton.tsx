import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CardSkeletonProps {
	count?: number;
}

export function CardSkeleton({ count = 6 }: CardSkeletonProps) {
	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{Array.from({ length: count }, (_, index) => (
				<Card key={index}>
					<CardHeader>
						<Skeleton className="h-4 w-2/3" />
						<Skeleton className="h-3 w-1/3" />
					</CardHeader>
					<CardContent className="space-y-2">
						<Skeleton className="h-3 w-full" />
						<Skeleton className="h-3 w-5/6" />
						<Skeleton className="h-3 w-1/2" />
					</CardContent>
				</Card>
			))}
		</div>
	);
}
