import { HOSTS, LOCAL_STORAGE_KEYS } from "@/commons/constants";
import {
  LoginRequest,
  LoginResponse,
  Member,
  RefreshRequest,
  RefreshResponse,
} from "./types";
import { Result, returnError, returnSuccess } from "@/baseTypes";
import api from "../client";
import axios from "axios";

const BASE_URL = HOSTS.PASSPORT;
export const ENDPOINTS = {
  LOGIN: "/users/login",
  REGISTER: "/users/register",
  UPDATE: "/users/me",
  RENEW_REFRESH: "/auth/tokens/renew-refresh",
  RENEW_AUTH: "/auth/tokens/renew-auth",
  GET_USER_BY_USER_IDS: "/users/",
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

export const renewRefresh = async (): Promise<
  Result<RefreshResponse, string>
> => {
  const url = BASE_URL + ENDPOINTS.RENEW_REFRESH;
  try {
    const REFRESH_TOKEN = localStorage.getItem(
      LOCAL_STORAGE_KEYS.REFRESH_TOKEN
    );
    if (!REFRESH_TOKEN) {
      return returnError<RefreshResponse, string>("No refresh token found");
    }
    const payload: RefreshRequest = {
      jwt: REFRESH_TOKEN,
    };
    const res = await axios.post(url, payload);
    localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, res.data.data.jwt);
    return returnSuccess<RefreshResponse, string>(res.data.data);
  } catch (e) {
    console.error("An unexpected error occurred:", e);
    return returnError<RefreshResponse, string>("Something went wrong");
  }
};

export const renewAuth = async (): Promise<Result<RefreshResponse, string>> => {
  const url = BASE_URL + ENDPOINTS.RENEW_AUTH;
  try {
    const REFRESH_TOKEN = localStorage.getItem(
      LOCAL_STORAGE_KEYS.REFRESH_TOKEN
    );
    if (!REFRESH_TOKEN) {
      return returnError<RefreshResponse, string>("No refresh token found");
    }
    const payload: RefreshRequest = {
      jwt: REFRESH_TOKEN,
    };
    const res = await axios.post(url, payload);
    return returnSuccess<RefreshResponse, string>(res.data.data);
  } catch (e) {
    console.error("An unexpected error occurred:", e);
    return returnError<RefreshResponse, string>("Something went wrong");
  }
};

export const updateProfile = async (formData: {
  username?: string;
  profilePic?: string;
}): Promise<Result<string, string>> => {
  const url = BASE_URL + ENDPOINTS.UPDATE;
  try {
    const res = await api.put(url, formData);
    return returnSuccess<string, string>(res.data.data);
  } catch (e) {
    console.error("An unexpected error occurred:", e);
    return returnError<string, string>("Something went wrong");
  }
};

export const getUserByUserIDs = async (
  userIds: string[]
): Promise<Result<Member[], string>> => {
  const url = BASE_URL + ENDPOINTS.GET_USER_BY_USER_IDS + userIds.join(",");
  try {
    const res = await api.get(url);
    return returnSuccess<Member[], string>(res.data.data);
  } catch (e) {
    console.error("An unexpected error occurred:", e);
    return returnError<Member[], string>("Something went wrong");
  }
};
