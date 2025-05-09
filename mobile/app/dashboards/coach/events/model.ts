import { EventType } from "../../../shared/models/Event";

  export interface Event {
    id: number;
    timestamp: number;
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
    timestamp: number;
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
    photo: string;
    first_name: string;
    last_name: string;

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
}