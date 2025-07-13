export interface Camp {
  id: number;
  name: string;
}

export interface Coach {
  id: number;
  camp_id: number;
  photo: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  active: boolean;
  signature: string;
}

export interface CoachGroup {
  id: number;
  coache_id: number;
  group_id: number;
  name: string;
  desc: string;
}

export interface FreeGroup {
  camp_name: string;
  id: number;
  name: string;
  desc: string;
}

export interface Event {
  date: string;
  time: string;
  desc: string;
  group1_id: number;
  group2_id: number;
  group1: string;
  group2: string;
}

export interface Schedule {
  coach_id: number;
  weekday: string;
  time: string;
  group: string;
}