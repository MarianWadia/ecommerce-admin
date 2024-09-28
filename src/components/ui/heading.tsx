import React from "react";

interface headingProps {
	title: string;
	description: string;
}

export default function Heading({ title, description }: headingProps) {
	return (
		<div className="flex flex-col">
			<h2 className="text-3xl font-bold tracking-tight">{title}</h2>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	);
}
