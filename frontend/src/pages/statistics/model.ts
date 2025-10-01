import { EffectName } from '../../shared/constants'


export interface Camp {
  id: number;
  name: string;
  city: string;
}

export interface CampTest {
  speed: number;
  stamina: number;
  climbing: number;
  evasion: number;
  hiding: number;
}

export interface GroupTest {
  timestamp: number;
  group_id: number;
  speed: number;
  stamina: number;
  climbing: number;
  evasion: number;
  hiding: number;
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
  count: number;
}

export interface Lider {
    id: number;
    photo: string;
    first_name: string;
    last_name: string;
    group_name: string;

    speed: number;
    stamina: number;
    climbing: number;
    evasion: number;
    hiding: number;
}

export interface GroupAchieve {
  group_id: number;
  group_name: string;
  achieves_count: number;
}

export interface StudentAchieve {
  id: number;
  image: string;
  name: string;
  level: number;
}

export interface Honored {
  id: number;
  photo: string;
  first_name: string;
  last_name: string;
  achieves: StudentAchieve[];
}
