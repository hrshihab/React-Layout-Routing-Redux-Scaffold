export const jwtDecode = <T = Record<string, unknown>>(token: string): T => {
  const parts = token.split('.');

  if (parts.length < 2) {
    throw new Error('Invalid token format');
  }

  const payload = parts[1]
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const decoded = atob(payload);
  return JSON.parse(decoded) as T;
};