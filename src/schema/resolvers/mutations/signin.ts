import { AuthenticationError } from "apollo-server-errors";
import bcrypt from "bcrypt";

import Context from "../context";
import {
  createRefreshToken,
  createAccessToken,
  setRefreshTokenCookie,
} from "../../../utils/auth";

interface SigninInput {
  name: string;
  password: string;
}

interface SigninResponse {
  accessToken: string;
}

const signin = async (
  _: any,
  { input }: { input: SigninInput },
  { prisma, res }: Context
): Promise<SigninResponse> => {
  const user = await prisma.user.findUnique({ where: { name: input.name } });
  if (!user) throw new AuthenticationError("Username or password is invalid.");

  const isValid = await bcrypt.compare(input.password, user.password);
  if (!isValid) {
    throw new AuthenticationError("Username or password is invalid.");
  }

  const refreshToken = createRefreshToken(user);
  setRefreshTokenCookie(res, refreshToken);

  const accessToken = createAccessToken(user);

  return { accessToken };
};

export default signin;
