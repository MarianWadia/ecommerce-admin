"use client"
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { LucideCopy, Server } from "lucide-react";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";

interface ApiAlertProps {
	title: string;
	description: string;
	variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
	public: "Public",
	admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
	public: "secondary",
	admin: "destructive",
};

export default function ApiAlert({
	title,
	description,
	variant = "public",
}: ApiAlertProps) {
    const handleCopy = (description : string)=>{
        navigator.clipboard.writeText(description)
        toast.success("Api route copied to clipboard")
    }
	return (
		<Alert>
			<AlertTitle className="flex flex-row items-center gap-x-2">
				<Server className="w-3.5 h-3.5" />
				{title}
				<Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
			</AlertTitle>
			<AlertDescription className="ml-6 mt-2 flex flex-row items-center justify-between">
				<code className="relative rounded bg-muted text-sm font-mono font-semibold px-[0.3rem] py-[0.2rem]">
					{description}
				</code>
                <Button variant="outline" size="icon" onClick={()=>{handleCopy(description)}}>
                    <LucideCopy className="w-4 h-4" />
                </Button>
			</AlertDescription>
		</Alert>
	);
}
