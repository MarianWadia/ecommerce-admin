import { UserButton } from "@clerk/nextjs";
import React from "react";
import MainNav from "./mainNav";
import StoreSwitcher from "./storeSwitcher";
import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function getStores(userId: string) {
	const stores = await prismadb.store.findMany({
		where: {
			userId,
		},
	});
	return stores;
}

export default async function Navbar() {
	const { userId } = auth();
	if (!userId) redirect("/sign-in");
	const stores = await getStores(userId);
	return (
		<div className="border border-b">
			<div className="w-full flex flex-row items-center h-16 px-6">
				<StoreSwitcher items={stores} />
				<MainNav className="mx-6" />
				<div className="ml-auto flex flex-row items-center gap-x-3">
					<UserButton afterSwitchSessionUrl="/" />
				</div>
			</div>
		</div>
	);
}
