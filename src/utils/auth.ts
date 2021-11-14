import { User, Role } from ".prisma/client";
import { AuthenticationError } from "apollo-server-errors";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import config from "../config";
import prisma from "../db";

type TokenPayload = {
  id: number;
  role: Role;
};

export const createAccessToken = (user: User) => {
  const payload: TokenPayload = { id: user.id, role: user.role };

  return jwt.sign(payload, config.secrets.accessToken, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (user: User) => {
  return jwt.sign({ id: user.id }, config.secrets.refreshToken, {
    expiresIn: "7d",
  });
};

export const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
  res.cookie(config.cookies.refreshToken, refreshToken, {
    httpOnly: true,
    path: "/refresh_token",
  });
};

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies[config.cookies.refreshToken];
  if (!refreshToken) return res.status(400).end();

  try {
    const { id } = jwt.verify(
      refreshToken,
      config.secrets.refreshToken
    ) as TokenPayload;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(400).end();

    const accessToken = createAccessToken(user);

    return res.json({ accessToken });
  } catch (error) {
    return res.status(401).end();
  }
};

export const protect =
  (next: any, ...allowedRoles: Role[]) =>
  async (root: any, args: any, context: any, info: any) => {
    const bearer = context.req.headers.authorization;

    if (!bearer || !bearer.startsWith("Bearer ")) {
      throw new AuthenticationError("Not Auth");
    }

    const token = bearer.split("Bearer ")[1].trim();
    try {
      const { id, role } = (await jwt.verify(
        token,
        config.secrets.accessToken
      )) as TokenPayload;

      if (allowedRoles.length !== 0 && !allowedRoles.includes(role)) {
        throw new AuthenticationError("Not Auth");
      }

      // Now, resolvers can access to the user id.
      context.id = id;
      return next(root, args, context, info);
    } catch (e) {
      throw new AuthenticationError("Not Auth");
    }
  };
