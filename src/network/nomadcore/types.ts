export interface FetchPublicCalendarsSuccess {
  status: number;
  data: Data;
}

export interface Data {
  calendars: Calendar[];
}

export interface Calendar {
  uuid: string;
  name: string;
  visibility: string;
}
