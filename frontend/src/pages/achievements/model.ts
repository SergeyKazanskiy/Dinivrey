import { EffectName } from '../../shared/constants';

export interface Achieve {
    image: string;
    name: string;
    desc: string;
    hasRules: boolean;
    category: string;
    trigger: string;
    effect: string;
  }

  export interface AchieveShort {
    id: number;
    image: string;
    name: string;
    category: string;
  }
  
export interface Rule {
  id?: number;
  type: string;
  level: number;
  parameter: string;
  condition: string;
  value: number;
  selection: string;
  achieve_id: number;
}

export interface AchieveReport {
  earned: number;
  percentage: number;
  date: string;
  firstName: string;
  lastName: string;
}

  export interface Camp {
    id: number;
    name: string;
}

export interface Group {
    id: number;
    camp_id: number;
    name: string;
}

export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    photo: string | undefined;
    gender: string;
    age: number;
}