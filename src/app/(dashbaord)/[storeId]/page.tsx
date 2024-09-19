import { prismadb } from "@/lib/prismadb";
import React from "react";

export default async function StorePage({
	params,
}: {
	params: {
		storeId: string;
	};
}) {
  const store = await prismadb.store.findFirst({
    where: {id: params.storeId}
  })
	return <div>
    Active store: {store?.name}
  </div>;
}
