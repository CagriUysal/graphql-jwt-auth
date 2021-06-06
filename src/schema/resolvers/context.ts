import { PrismaClient } from "@prisma/client";
import { Request } from "express";

export default interface Context {
  prisma: PrismaClient;
  req: Request;
}
