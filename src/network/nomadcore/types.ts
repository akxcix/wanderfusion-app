export interface Root<T> {
  status: number;
  data: T;
}

// responses --------------------------------------------------------------------------------------
export interface GetGroupsResponse {
  groups: Group[];
}

export interface GetGroupResponse {
  group: Group;
  dates: GroupDate[];
  users: User[];
}

export interface GetUserProfileResponse {
  username: string;
  createdAt: string;
  userId: string;
  bio: string;
  interests: string;
  metadata: string;
}

// base types -------------------------------------------------------------------------------------
export interface Group {
  id: string;
  createdAt: string;
  name: string;
  description: string;
}

export interface GroupDate {
  id: string;
  from: string;
  to: string;
}

export interface User {
  id: string;
}
