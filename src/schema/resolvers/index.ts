import all from "./queries/all";
import userProtected from "./queries/userProtected";
import adminOnly from "./queries/adminOnly";

import signup from "./mutations/signup";
import signin from "./mutations/signin";
import logout from "./mutations/logout";

import { protect } from "../../utils/auth";

export default {
  Query: {
    all,
    userProtected: protect(userProtected),
    adminOnly: protect(adminOnly, "ADMIN"),
  },
  Mutation: {
    signup,
    signin,
    logout: protect(logout),
  },
};
