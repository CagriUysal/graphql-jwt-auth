import { User, Role } from ".prisma/client";
import { AuthenticationError } from "apollo-server-errors";
import jwt from "jsonwebtoken";

import config from "../config";

export const createToken = (user: User) => {
  return jwt.sign({ id: user.id }, config.secrets.jwt);
};

export const protect =
  (next, ...allowedRoles: Role[]) =>
  async (root, args, context, info) => {
    const bearer = context.req.headers.authorization;

    if (!bearer || !bearer.startsWith("Bearer ")) {
      throw new AuthenticationError("Not Auth");
    }

    const token = bearer.split("Bearer ")[1].trim();
    try {
      const { id } = await jwt.verify(token, config.secrets.jwt);
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
