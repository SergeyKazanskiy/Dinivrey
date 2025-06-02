import { EventType } from "../../shared/models/Event";

export interface Student {
    id: number;
    photo: string;
    first_name: string;
    last_name: string;
    gender: string;
    age: number;
    active: boolean;
    group_id: number;
    group_extra_id?: number;
  }

  export interface Event {
    id: number;
    timestamp: number;
    type: string;
    desc: string;
  }

  export interface Achievement {
    id: number;
    image: string;
    name: string;
    level: string;
    effect: string;
  }

  export interface Achieve {
    id: number;
    image: string;
    name: string;
    in_profile: boolean;
    category: string;
    level: string;
    effect: string;
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
  
  export interface AchieveShort {
    image: string;
    level: string;
}

export interface Lider {
    id: number;
    photo: string;
    first_name: string;
    last_name: string;

    speed: number;
    stamina: number;
    climbing: number;
    evasion: number;
    hiding: number;

    achieves: AchieveShort[];
}

export interface Group {
  id: number;
  name: string;
  description: string;
}

export interface Metric {
  timestamp: number;
  name: string;
  score: number;
  unit: string;
  time: string;
};