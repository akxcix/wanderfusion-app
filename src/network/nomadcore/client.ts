import { HOSTS } from "@/commons/constants";
import { GetGroupsResponse, Root } from "./types";
import api from "../client";

const BASE_URL = HOSTS.NOMADCORE;
const ENDPOINTS = {
  GET_GROUPS: "/groups",
  POST_NEW_DATES: "/groups/dates/new",
  POST_NEW_GROUP: "/groups/new",
};

export const fetchPublicCalendars = async () => {
  const url = BASE_URL + ENDPOINTS.GET_GROUPS;
  try {
    const response = await api.get<Root<GetGroupsResponse>>(url);
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
  const payload = {
    groupId,
    dates: {
      from,
      to,
    },
  };

  try {
    const response = await api.post(url, payload);
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
  const payload = {
    name: formData.name,
    description: formData.description,
  };

  try {
    const response = await api.post(url, payload);
    return response.data.data;
  } catch (e) {
    console.error("failed to create new calendar");
  }
};
