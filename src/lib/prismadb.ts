import { PrismaClient } from "@prisma/client";

// here we declare the global variable like this because by default TypeScript does not know about any variables added to the global scope so we didn't make it like var prisma we made it like this by declare global to ensure the TypeScript compiler knows about this global variable.

declare global {
	var prisma: PrismaClient | undefined;
}

// This line is where the actual instance of the PrismaClient is created or reused.
// This is a reference to the global scope in any environment

export const prismadb = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;


