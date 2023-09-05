import { HOST_NOMADCORE, LOCALSTORAGE_JWT_KEY } from "@/commons/constants";
import axios from "axios";
import { GetCalendarsResponse, Root } from "./types";

const BASE_URL = HOST_NOMADCORE;
const ENDPOINTS = {
  USER_PUBLIC_CALENDARS: "/calendars/public",
  NEW_DATES: "/calendars/dates/new",
};

export const fetchPublicCalendars = async () => {
  const accessToken = localStorage.getItem(LOCALSTORAGE_JWT_KEY);
  const headers = { Authorization: `Bearer ${accessToken}` };
  const url = BASE_URL + ENDPOINTS.USER_PUBLIC_CALENDARS;
  const config = {
    headers: headers,
  };

  try {
    const response = await axios.get<Root<GetCalendarsResponse>>(url, config);
    return response.data.data;
  } catch (e) {
    console.error("An unexpected error occurred:", e);
  }
};

export const addNewDatesToCalendar = async (
  calendarId: string,
  from: string,
  to: string
): Promise<string | void> => {
  const accessToken = localStorage.getItem(LOCALSTORAGE_JWT_KEY);
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const url = `${BASE_URL}${ENDPOINTS.NEW_DATES}`;
  const payload = {
    calendarId,
    dates: {
      from,
      to,
    },
  };

  try {
    const response = await axios.post(url, payload, { headers });
    return response.data.data;
  } catch (e) {
    console.error("Failed to add new dates:", e);
  }
};
