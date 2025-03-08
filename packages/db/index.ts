import { PrismaClient } from "@prisma/client";
//convert this to a singleton for next.js
export const prismaClient = new PrismaClient();