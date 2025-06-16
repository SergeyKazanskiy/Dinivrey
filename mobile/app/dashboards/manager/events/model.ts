export interface Camp {
  id: number;
  name: string;
  groups: number;
  students: number;
  coaches: number;
}

export interface Group {
  id: number;
  camp_id: number;
  name: string;
}

export interface Event {
  id: number;
  camp_id: number
  timestamp: number;
  type: string;
  desc: string;
  group1_id: number;
  group2_id: number;
}

export interface GroupEvent {
  id: number;
  timestamp: number; // San 7, 16:30
  type: string;
  desc: string;
  amound: number;
}

export interface Attendance {
  id: number;
  student_id: number;
  first_name: string;
  last_name: string;
  present: boolean;
}