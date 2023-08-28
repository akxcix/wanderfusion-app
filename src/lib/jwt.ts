import jwtDecode from "jwt-decode";

interface Payload {
  id: string;
  email: string;
  expiresAt: string;
}

export const decodeJwt = (token: string): Payload | null => {
  try {
    const decoded = jwtDecode<Payload>(token);
    return decoded;
  } catch (error) {
    return null;
  }
};
