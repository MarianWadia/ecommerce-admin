"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export default function MainNav({
	className,
	...props
}: React.HtmlHTMLAttributes<HTMLElement>) {
	const pathname = usePathname();
	const params = useParams();
	const routes = [
		{
			href: `/${params.storeId}`,
			label: "Overview",
			isActive: pathname === `/${params.storeId}`,
		},
		{
			href: `/${params.storeId}/settings`,
			label: "Settings",
			isActive: pathname === `/${params.storeId}/settings`,
		},
	];
	return (
		<nav
			className={cn(
				"flex flex-row items-center space-x-4 lg:space-x-6",
				className
			)}
		>
			{routes.map((route) => (
				<Link key={route.href} href={route.href} className={cn("font-medium hover:text-primary text-sm transition-colors", route.isActive ? "text-black dark:text-white" : "text-muted-foreground")}>
					{route.label}
				</Link>
			))}
		</nav>
	);
}
