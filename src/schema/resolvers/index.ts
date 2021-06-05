import signup from "./mutations/signup";

export default {
  Query: {
    hello: () => "hello",
  },
  Mutation: {
    signup,
  },
};
