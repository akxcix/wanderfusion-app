export interface Root<T> {
  status: number;
  data: T;
}

// responses --------------------------------------------------------------------------------------
export interface GetGroupsResponse {
  groups: Group[];
}

// base types -------------------------------------------------------------------------------------
export interface Group {
  id: string;
  name: string;
  description?: string;
  dates?: Date[];
}

export interface Date {
  id: string;
  from: string;
  to: string;
}
