const config = {
  port: Number(process.env.PORT) || 4000,
  secrets: {
    jwt: process.env.JWT_SECRET || "mysecret",
  },
};

export default config;
