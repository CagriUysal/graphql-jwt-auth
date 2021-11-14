import { User, Role } from ".prisma/client";
import { AuthenticationError } from "apollo-server-errors";
import jwt from "jsonwebtoken";

import config from "../config";

type TokenPayload = {
  id: number;
};

export const createToken = (user: User) => {
  const payload: TokenPayload = { id: user.id };
  return jwt.sign(payload, config.secrets.jwt);
};

// TODO: use correct types instead of `any`s :)
export const protect =
  (next: any, ...allowedRoles: Role[]) =>
  async (root: any, args: any, context: any, info: any) => {
    const bearer = context.req.headers.authorization;

    if (!bearer || !bearer.startsWith("Bearer ")) {
      throw new AuthenticationError("Not Auth");
    }

    const token = bearer.split("Bearer ")[1].trim();
    try {
      const { id } = (await jwt.verify(
        token,
        config.secrets.jwt
      )) as TokenPayload;
      const user = await context.prisma.user.findUnique({ where: { id } });

      if (user === null) throw new AuthenticationError("Not Auth");

      if (allowedRoles.length !== 0 && !allowedRoles.includes(user.role)) {
        throw new AuthenticationError("Not Auth");
      }
    } catch (e) {
      throw new AuthenticationError("Not Auth");
    }

    return next(root, args, context, info);
  };
