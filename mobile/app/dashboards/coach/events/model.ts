import { EventType } from "../../../shared/models/Event";


export interface Schedule {
  id: number;
  group_id: number;
  weekday: number; // 7 (Sanday)
  hour: number; // 16
  minute: number; // 30
}

export interface Event {
  id: number;
  camp_id: number
  timestamp: number; // San 16:30, (no year, month, day)
  type: string;
  desc: string;
  day?: number;
  group1_id: number;
  group2_id: number;
}

export interface Student {
  first_name: string;
  last_name: string;
}

export type Test = {
  id: number;
  student_id: number;
  timestamp: number;
  date: string;
  speed: number;
  stamina: number;
  climbing: number;
  evasion: number;
  hiding: number;
};
  
export type Game = {
  id: number;
  timestamp: number;
  caughted: number;
  freeded: number;
  //description?: string;
};


export interface Tester {
    id: number;
    participate: boolean;
    first_name: string;
    last_name: string;

    test_id: number;
    speed: number;
    stamina: number;
    climbing: number;
    evasion: number;
    hiding: number;
}

export interface Metric {
  timestamp: number;
  name: string;
  score: number;
  unit: string;
};

export interface Attendance {
  id: number;
  student_id: number;
  first_name: string;
  last_name: string;
  present: boolean;
  test_id?: number;
}
