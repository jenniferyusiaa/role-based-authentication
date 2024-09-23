import { User } from "../types/user";

const testUser: User = {
  id: 1,
  email: "user@email.com",
  role: "viewer",
};

type LoginResponse = [number, { authToken: string; user: User }];

export const getUser = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const authToken = generateAuthToken();

  return [200, { authToken, user: testUser }] as const;
};

export const login = async (): Promise<LoginResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const authToken = generateAuthToken();

  return [200, { authToken, user: testUser }];
};

const generateAuthToken = () => {
  return Math.random().toString(36).substring(2);
};
