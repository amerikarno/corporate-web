export type TUser = {
  id: string;
  email: string;
  name?: string;
  lastName?: string;
  image?: string;
  groups?: null;
  permissions?: null;
  roles?: null;
  userId?: string;
  loginStatus?: string;
  expiresDate: string;
  Error: string | null;
  exp: number;
  iat: number;
};
