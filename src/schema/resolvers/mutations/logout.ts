import { setRefreshTokenCookie } from "../../../utils/auth";

import Context from "../context";

interface LogoutResponse {
  message: string;
}

const logout = (_: any, __: any, { res }: Context): LogoutResponse => {
  setRefreshTokenCookie(res, ""); // reset cookie

  return { message: "Logged out succesfully." };
};

export default logout;
