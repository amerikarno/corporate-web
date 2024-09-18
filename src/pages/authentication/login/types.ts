export type TUser = {
  id?: string;
  email?: string;
  groups?: number[];
  permissions?: number[];
  roles?: number[];
  userId?: string;
  loginStatus?: string;
  Error?: string | null;
  exp?: number;
  iat?: number;
  name?: string;
};
