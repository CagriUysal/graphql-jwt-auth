interface AdminOnlyResponse {
  message: string;
}
const adminOnly = (): AdminOnlyResponse => {
  return {
    message: "Hello, you have reached the admin only endpoint 🦍",
  };
};

export default adminOnly;
