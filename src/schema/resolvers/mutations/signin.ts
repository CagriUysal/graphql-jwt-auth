import { AuthenticationError } from "apollo-server-errors";
import bcrypt from "bcrypt";

import { createToken } from "../../../utils/auth";
import Context from "../context";

interface SigninInput {
  name: string;
  password: string;
}

interface SigninResponse {
  token: string;
}

const signin = async (
  _: any,
  { input }: { input: SigninInput },
  { prisma }: Context
): Promise<SigninResponse> => {
  const user = await prisma.user.findUnique({ where: { name: input.name } });
  if (!user) throw new AuthenticationError("Username or password is invalid.");

  const isValid = await bcrypt.compare(input.password, user.password);
  if (!isValid) {
    throw new AuthenticationError("Username or password is invalid.");
  }

  const token = createToken(user);

  return { token };
};

export default signin;
