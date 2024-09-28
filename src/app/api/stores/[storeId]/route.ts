import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { userId } = auth();
		const { name } = await req.json();
		if (!userId) return new NextResponse("Unauthorized", { status: 401 });
		if (!params.storeId)
			return new NextResponse("Store ID is required", { status: 400 });
		if (!name)
			return new NextResponse("store name is required", { status: 400 });
		const updatedStore = await prismadb.store.updateMany({
			where: {
				userId,
				id: params.storeId,
			},
			data: {
				name,
			},
		});
		return NextResponse.json(updatedStore);
	} catch (error) {
		console.log("[STORE_PATCH]", error);
		return new NextResponse("Internal server error", { status: 500 });
	}
}

export async function DELETE(
	// even though we don't user the req argument we still need to add it because the { params } is only available at the 2nd place argument if req is removed the { params } argument will not work
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { userId } = auth();
		if (!userId) return new NextResponse("Unauthorized", { status: 401 });
		if (!params.storeId)
			return new NextResponse("Store ID is required", { status: 400 });
		await prismadb.store.deleteMany({
			where: {
				id: params.storeId,
				userId,
			},
		});
		return new NextResponse("Store deleted", { status: 200 });
	} catch (error) {
		console.log("[STORE_DELETE]", error);
		return new NextResponse("Internal server error", { status: 500 });
	}
}
