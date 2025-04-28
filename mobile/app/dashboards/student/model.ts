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
  }

  export type Test = {
    speed: number;
    stamina: number;
    climbing: number;
    evasion: number;
    hiding: number;
  };
  
  export type Game = {
    caughted: number;
    freeded: number;
    description?: string;
  };
  
  export interface AchieveShort {
    image: string;
    level: string;
}

export interface Lider {
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