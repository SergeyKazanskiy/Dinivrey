
export interface Camp {
  id: number;
  name: string;
}

export interface Schedule {
  id: number;
  weekday: number;
  time: string;
  group: string;
  coach: string
}

export interface CoachShort {
  id: number;
  first_name: string;
  last_name: string;
  camp_name: string;
  camp_id: number;
}