import { HOST_NOMADCORE, LOCALSTORAGE_JWT_KEY } from "@/commons/constants";
import axios from "axios";
import { GetCalendarsResponse, Root } from "./types";

const BASE_URL = HOST_NOMADCORE;
const ENDPOINTS = {
  GET_PUBLIC_CALENDARS: "/calendars/public",
  POST_NEW_DATES: "/calendars/dates/new",
  POST_NEW_CALENDAR: "/calendars/new",
};

const getAuthHeaders = () => {
  const accessToken = localStorage.getItem(LOCALSTORAGE_JWT_KEY);
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  return headers;
};

const getConfig = () => {
  return {
    headers: getAuthHeaders(),
  };
};

export const fetchPublicCalendars = async () => {
  const url = BASE_URL + ENDPOINTS.GET_PUBLIC_CALENDARS;
  const config = getConfig();

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
  const url = `${BASE_URL}${ENDPOINTS.POST_NEW_DATES}`;
  const config = getConfig();
  const payload = {
    calendarId,
    dates: {
      from,
      to,
    },
  };

  try {
    const response = await axios.post(url, payload, config);
    return response.data.data;
  } catch (e) {
    console.error("Failed to add new dates:", e);
  }
};

export const createNewCalendar = async (formData: {
  name: string;
  visibilityControl: string;
}): Promise<string | void> => {
  const url = `${BASE_URL}${ENDPOINTS.POST_NEW_CALENDAR}`;
  const config = getConfig();
  const payload = {
    name: formData.name,
    visibility: formData.visibilityControl,
  };

  try {
    const response = await axios.post(url, payload, config);
    return response.data.data;
  } catch (e) {
    console.error("failed to create new calendar");
  }
};
