import { jwtDecode } from './tinyJwtDecode';

export type DecodedToken = {
  role?: string;
  userId?: string;
  [key: string]: unknown;
};

export const verifyToken = (token: string): DecodedToken => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch {
    return {};
  }
};