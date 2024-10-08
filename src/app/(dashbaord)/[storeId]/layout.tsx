import Navbar from "@/components/navbar";
import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

type DashboardLayoutProps = {
	params: { storeId: string };
	children: React.ReactNode;
};
export default async function DashboardLayout({
	params,
	children,
}: DashboardLayoutProps) {
	const { userId } = auth();
	if (!userId) redirect("/sign-in");
	const store = await prismadb.store.findFirst({
		where: { id: params.storeId, userId },
	});
	if (!store) redirect("/");
	return (
		<>
			<Navbar />
			{children}
		</>
	);
}
