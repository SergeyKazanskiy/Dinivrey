import { EffectName } from '../../shared/constants'


export interface Camp {
  id: number;
  name: string;
  city: string;
}

export interface Group {
  id: number;
  camp_id: number;
  name: string;
  description?: string;
}

export interface StudentProfile {
  photo: string;
  first_name: string;
  last_name: string;
  phone?: string;
  age: number;
  gender: string;
  active: boolean;
}

export interface StudentAddress {
  city?: string;
  street?: string;
  home?: string;
}

export interface StudentGroups {
  group_id: number;
  group_extra_id?: number;
}

export interface Student extends StudentProfile, StudentAddress, StudentGroups {
  id: number;
}

export interface Parent {
  id: number;
  student_id: number;
  name: string;
  phone: string;
  email: string;
}

  export interface Attendance {
    Training: number;
    Exam: number;
    Game: number;
  }

// Test
export type Test = {
  id: number;
  timestamp: number;
  date: string

  speed: number;
  stamina: number;
  climbing: number;
  evasion: number;
  hiding: number;

  speed_time: number;
  stamina_time: number;
  climbing_time: number;
};

export interface TestUpdate {
  exam: string;
  value: number;
  camp_id: number;
}

// Game
export enum Team {
  RED = "Red",
  GREEN = "Green"
};

export type Game = { 
  id: number;
  timestamp: number;
  team: Team;

  caught: number;
  freeded: number;
  is_survived: number;
  won: string;
  date: string;
}

// Achievement
export interface Achievement {
  id: number; // Achievement id
  image: string;
  name: string;
  desc: string;
  in_profile: boolean;
  category: string;
  level: number;
  trigger: string;
  effect: string;
}

export interface Achieve {
  id: number;
  image: string;
  name: string;
  category: string;
}

export interface AchieveAttach {
  student_id: number;
  achieve_id: number;
  level: number;
  in_profile: boolean;
}

export interface ColumnStructure {
  name: string;
  width: string;
}