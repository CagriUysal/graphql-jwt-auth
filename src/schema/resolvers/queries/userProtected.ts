interface UserProtectedResponse {
  message: string;
}
const userProtected = (): UserProtectedResponse => {
  return { message: "Hello, you have reached the protected endpoint 🦄." };
};

export default userProtected;
