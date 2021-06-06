interface AllResponse {
  message: string;
}

const all = (): AllResponse => {
  return { message: "Hello, you have reached the public endpoint 🐣." };
};

export default all;
