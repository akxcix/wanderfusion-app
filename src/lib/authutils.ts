import { setPayload } from "@/redux/utils";
import { login, register } from "@/network/passport"; // your existing apiCall file
import { LOCALSTORAGE_JWT_KEY } from "@/commons/constants";

export const handleLogin = async (
  formData: { email: string; password: string },
  dispatch: any
) => {
  const response = await login(formData);
  if (response.status === "success") {
    localStorage.setItem(LOCALSTORAGE_JWT_KEY, response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    setPayload(dispatch, response.data);
  }
  return response;
};

export const handleLogout = (dispatch: any) => {
  // Remove tokens from localStorage
  localStorage.removeItem(LOCALSTORAGE_JWT_KEY);
  localStorage.removeItem("refreshToken");

  // Reset Redux state
  setPayload(dispatch, null);
};
