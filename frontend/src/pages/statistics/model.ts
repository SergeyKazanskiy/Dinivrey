import { EffectName } from '../../shared/constants'


export interface Camp {
  id: number;
  name: string;
  city: string;
}

export interface Card {
  camp_id: number;
  name: string;
  radаr: number[];
}

export interface Group {
  id: number;
  camp_id: number;
  name: string;
  description?: string;
}

export interface Attendance {
  student_id: number;
  trainings: number;
  tests: number;
  games: number;
  total: number;
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
  student_id: number;
  timestamp: number;
  date: string;
  caughted: number;
  freeded: number;
  description?: string;
};

export interface Achieve {
  id: number;
  image: string;
  name: string;
  category: string;
}

export interface Lider {
    id: number;
    photo: string;
    first_name: string;
    last_name: string;
    gender: string;
    age: number;
    phone: string;

    speed: number;
    stamina: number;
    climbing: number;
    evasion: number;
    hiding: number;

    achieves: Achieve[];
}