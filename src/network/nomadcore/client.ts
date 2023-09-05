import { HOST_NOMADCORE, LOCALSTORAGE_JWT_KEY } from "@/commons/constants";
import axios from "axios";
import { GetGroupsResponse, Root } from "./types";

const BASE_URL = HOST_NOMADCORE;
const ENDPOINTS = {
  GET_GROUPS: "/groups",
  POST_NEW_DATES: "/groups/dates/new",
  POST_NEW_GROUP: "/groups/new",
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
  const url = BASE_URL + ENDPOINTS.GET_GROUPS;
  const config = getConfig();

  try {
    const response = await axios.get<Root<GetGroupsResponse>>(url, config);
    return response.data.data;
  } catch (e) {
    console.error("An unexpected error occurred:", e);
  }
};

export const addNewDatesToCalendar = async (
  groupId: string,
  from: string,
  to: string
): Promise<string | void> => {
  const url = `${BASE_URL}${ENDPOINTS.POST_NEW_DATES}`;
  const config = getConfig();
  const payload = {
    groupId,
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
  description?: string;
}): Promise<string | void> => {
  const url = `${BASE_URL}${ENDPOINTS.POST_NEW_GROUP}`;
  const config = getConfig();
  const payload = {
    name: formData.name,
    description: formData.description,
  };

  try {
    const response = await axios.post(url, payload, config);
    return response.data.data;
  } catch (e) {
    console.error("failed to create new calendar");
  }
};
