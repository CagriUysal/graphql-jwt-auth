const config = {
  port: Number(process.env.PORT) || 4000,
  secrets: {
    accessToken: process.env.ACCESS_TOKEN_SECRET || "access",
    refreshToken: process.env.REFRESH_TOKEN_SECRET || "refresh",
  },
  cookies: {
    refreshToken: process.env.REFRESH_TOKEN_COOKIE_NAME || "refresh_token",
  },
};

export default config;
