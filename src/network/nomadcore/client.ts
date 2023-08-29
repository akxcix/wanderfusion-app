import { HOST_NOMADCORE, LOCALSTORAGE_JWT_KEY } from "@/commons/constants";
import axios from "axios";
import { FetchPublicCalendarsSuccess } from "./types";

const BASE_URL = HOST_NOMADCORE;
const ENDPOINTS = {
  USER_PUBLIC_CALENDARS: "/users/calendars/public",
};

export const fetchPublicCalendars = async () => {
  const accessToken = localStorage.getItem(LOCALSTORAGE_JWT_KEY);
  const headers = { Authorization: `Bearer ${accessToken}` };
  const url = BASE_URL + ENDPOINTS.USER_PUBLIC_CALENDARS;
  const config = {
    headers: headers,
  };

  try {
    const response = await axios.get<FetchPublicCalendarsSuccess>(url, config);
    return response.data.data;
  } catch (e) {
    console.error("An unexpected error occurred:", e);
  }
};
