import { HOSTS } from "@/commons/constants";
import { LoginRequest, LoginResponse } from "./types";
import { Result, returnError, returnSuccess } from "@/baseTypes";
import api from "../client";

const BASE_URL = HOSTS.PASSPORT;
const ENDPOINTS = {
  LOGIN: "/users/login",
  REGISTER: "/users/register",
  UPDATE: "/users/update",
};

export const login = async (
  email: string,
  password: string
): Promise<Result<LoginResponse, string>> => {
  const url = BASE_URL + ENDPOINTS.LOGIN;
  const payload: LoginRequest = { email, password };
  try {
    const res = await api.post(url, payload);
    return returnSuccess<LoginResponse, string>(res.data.data);
  } catch (e) {
    console.error("An unexpected error occurred:", e);
    return returnError<LoginResponse, string>("Something went wrong");
  }
};

export const register = async (formData: {
  email: string;
  password: string;
}): Promise<Result<string, string>> => {
  const url = BASE_URL + ENDPOINTS.REGISTER;
  try {
    const res = await api.post(url, formData);
    return returnSuccess<string, string>(res.data.data);
  } catch (e) {
    console.error("An unexpected error occurred:", e);
    return returnError<string, string>("Something went wrong");
  }
};

export const updateProfile = async (formData: {
  username?: string;
  profilePic?: string;
}): Promise<Result<string, string>> => {
  const url = BASE_URL + ENDPOINTS.UPDATE;
  try {
    const res = await api.post(url, formData);
    return returnSuccess<string, string>(res.data.data);
  } catch (e) {
    console.error("An unexpected error occurred:", e);
    return returnError<string, string>("Something went wrong");
  }
};
