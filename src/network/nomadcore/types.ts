export interface Root<T> {
  status: number;
  data: T;
}

// responses --------------------------------------------------------------------------------------
export interface GetCalendarsResponse {
  calendars: Calendar[];
}

// base types -------------------------------------------------------------------------------------
export interface Calendar {
  id: string;
  name: string;
  visibility: string;
  dates?: Date[];
}

export interface Date {
  id: string;
  from: string;
  to: string;
}
