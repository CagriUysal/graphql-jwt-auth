import { ApolloError, UserInputError } from "apollo-server-express";
import { Role } from "@prisma/client";
import Joi from "joi";
import bcrypt from "bcrypt";

import Context from "../context";

interface SingupInput {
  name: string;
  password: string;
  role: Role;
}

interface SingupResponse {
  message: string;
}

const signupPayloadSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).max(30).required(),
  role: Joi.string().valid(...Object.values(Role)), // Roles are defined in prisma schema.
});

const singup = async (
  _: any,
  { input }: { input: SingupInput },
  { prisma }: Context
): Promise<SingupResponse> => {
  const { error } = signupPayloadSchema.validate(input);
  if (error) throw new UserInputError(error.details[0].message);

  try {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    await prisma.user.create({
      data: { ...input, password: hashedPassword },
    });
  } catch (err) {
    if (err.code === "P2002") {
      throw new UserInputError(`${input.name} already taken`);
    } else {
      throw new ApolloError(err.message);
    }
  }

  return { message: `${input.name} created succesfully.` };
};

export default singup;
