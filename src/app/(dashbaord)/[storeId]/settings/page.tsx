import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import SettingsForm from "./components/settingsForm";

interface SettingsPageProps {
	params: {
		storeId: string;
	};
}

export default async function SettingsPage({ params }: SettingsPageProps) {
	const { storeId } = params;
	const { userId } = auth();
	if (!userId) redirect("/sign-in");
	const store = await prismadb.store.findFirst({
		where: {
			userId,
			id: storeId,
		},
	});
	if (!store) redirect("/");
	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<SettingsForm initialData={store} />
			</div>
		</div>
	);
}
