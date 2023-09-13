import { login } from "@/network/passport/client";
import { LOCAL_STORAGE_KEYS } from "@/commons/constants";
import { Result, returnError, returnSuccess } from "@/baseTypes";

export const handleLogin = async (formData: {
  email: string;
  password: string;
}): Promise<Result<string, string>> => {
  const { ok, err } = await login(formData.email, formData.password);
  if (ok) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, ok.authToken);
    localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, ok.refreshToken);
    return returnSuccess<string, string>(ok.authToken);
  } else {
    return returnError<string, string>(err);
  }
};

export const handleLogout = () => {
  // Remove tokens from localStorage
  localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
};
