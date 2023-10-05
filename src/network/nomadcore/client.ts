import { HOSTS } from "@/commons/constants";
import { GetGroupResponse, GetGroupsResponse, GetUserProfileResponse, Root } from "./types";
import api from "../client";
import { Result, returnError, returnSuccess } from "@/baseTypes";

const BASE_URL = HOSTS.NOMADCORE;
const ENDPOINTS = {
  GET_GROUPS: "/groups/me",
  GET_GROUP_BY_ID: "/groups/:id",
  POST_NEW_DATES: "/groups/dates/new",
  POST_NEW_USERS: "/groups/users/new",
  POST_NEW_GROUP: "/groups/new",
  GET_USER_PROFILE : "/users/:username"
};

export const getGroups = async () => {
  const url = BASE_URL + ENDPOINTS.GET_GROUPS;
  try {
    const response = await api.get<Root<GetGroupsResponse>>(url);
    return response.data.data;
  } catch (e) {
    console.error("An unexpected error occurred:", e);
  }
};

export const getGroupByID = async (
  id: string
): Promise<Result<GetGroupResponse, string>> => {
  const url = BASE_URL + ENDPOINTS.GET_GROUP_BY_ID.replace(":id", id);
  try {
    const response = await api.get<Root<GetGroupResponse>>(url);
    return returnSuccess<GetGroupResponse, string>(response.data.data);
  } catch (e) {
    console.error("An unexpected error occurred:", e);
    return returnError<GetGroupResponse, string>("Something went wrong");
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

export const addNewUsersToGroup = async (
  groupId: string,
  username: string
): Promise<Result<string, string>> => {
  const url = `${BASE_URL}${ENDPOINTS.POST_NEW_USERS}`;
  const payload = {
    groupId,
    usernames: [username],
  };

  try {
    const response = await api.post(url, payload);
    return returnSuccess<string, string>(response.data.data);
  } catch (e) {
    console.error("Failed to add new users:", e);
    return returnError<string, string>("Something went wrong");
  }
};

// const dummydata = {
// 	status: 200,
// 	data: {
// 		"username": "akxcix",
// 		"createdAt": "2023-09-29T13:51:27.521472Z",
// 		"userId": "1f6f96b5-113d-4f71-840f-9a5e99a06ff1",
// 		"bio": "bio",
// 		"interests": "injn",
// 		"metadata": "{\"name\":\"adarsh\"}"
// 	}
// }

export const getUserProfile = async (
  username: string
): Promise<Result<GetUserProfileResponse, string>> => {
  const url = BASE_URL + ENDPOINTS.GET_USER_PROFILE.replace(":username", username);
  try {
    const response = await api.get<Root<GetUserProfileResponse>>(url);
    return returnSuccess<GetUserProfileResponse, string>(response.data.data);
  } catch (e) {
    console.error("An unexpected error occurred:", e);
    return returnError<GetUserProfileResponse, string>("Something went wrong");
  }
};
