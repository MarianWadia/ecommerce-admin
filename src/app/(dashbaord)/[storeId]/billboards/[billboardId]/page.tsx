import { prismadb } from "@/lib/prismadb";
import React from "react";
import BillboardsForm from "./components/billboards-form";

export default async function BillboardIdPage({
	params,
}: {
	params: { billboardId: string };
}) {
	const existingBillboard = await prismadb.billboard.findUnique({
		where: {
			id: params.billboardId,
		},
	});
	return <div className="flex-col">
		<div className="flex-1 space-y-4 p-8 pt-6">
			<BillboardsForm initialData={existingBillboard} />
		</div>
	</div>;
}
