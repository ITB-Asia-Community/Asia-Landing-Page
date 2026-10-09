import { Link } from "@tanstack/react-router";
import {
	Breadcrumb as BreadcrumbRoot,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbCrumb {
	label: string;
	to?: string;
}

interface BreadcrumbProps {
	items: BreadcrumbCrumb[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
	return (
		<BreadcrumbRoot>
			<BreadcrumbList>
				{items.map((item, index) => {
					const isLast = index === items.length - 1;
					return (
						<BreadcrumbItem key={`${item.label}-${index}`}>
							{index > 0 ? <BreadcrumbSeparator /> : null}
							{isLast || !item.to ? (
								<BreadcrumbPage>{item.label}</BreadcrumbPage>
							) : (
								<BreadcrumbLink asChild>
									<Link to={item.to}>{item.label}</Link>
								</BreadcrumbLink>
							)}
						</BreadcrumbItem>
					);
				})}
			</BreadcrumbList>
		</BreadcrumbRoot>
	);
}
