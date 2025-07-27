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

// Game
export type Game = { 
  id: number;
  timestamp: number;
  caughted: number;
  freeded: number;
}

export type Player = {
  id: number;
  name: string;
  age: number;
  points: number;
  team: Team;
  role: Role;
  is_survived?: boolean;
};

export type GameReport = { 
  id: number;
  event_id: number;
  group_id: number;
  timestamp: number;
  first_team: 'Green' | 'Red';

  time1: number;
  time2: number;
  
  points1: number;
  points2: number;

  tags: number;
  rescues: number;
  winner: Team | 'Equally';
  presence: string;
}
  
export type TeamTotals = {
  team: Team;
  amount: number;

  caught: number;
  freeded: number;
  survived: number;
  bonus: number;
  total: number;
  info: { points: string, tags: string, bonus: string, rescues: string }; // 36 + 12 + 33 = 81, ...
}

export type Gamer = {
  id?: number;
  game_id?: number;
  student_id: number;
  name?: string;

  team: 'Green' | 'Red';
  caught: number;
  freeded: number;
  is_survived: boolean;
};

export enum Team {
  RED = "Red",
  GREEN = "Green"
};

export enum Role {
    EVADER = "Evader",
    CHASER = "Chaser"
};

export type GameRound = {
  round: number;
  teams: {team: Team, role: Role}[];
};

export type Total = {
  caught: number;
  freeded: number;
  survived: number;
}

// Achieve
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