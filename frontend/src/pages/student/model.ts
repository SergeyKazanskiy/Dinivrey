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
  student_id: number;
  level: string;
  image: string;
  name: string;
  category: string;
  effect: string;
}

export interface AchieveAttach {
  student_id: number;
  achieve_id: number;
  desc: string;
}

export interface ColumnStructure {
  name: string;
  width: string;
}