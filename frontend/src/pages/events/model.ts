export interface Camp {
    id: number;
    name: string;
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

  export interface FormatedEvent {
    id: number;
    date: string;
    time: string;
    type: string;
    desc: string;
    group1: string;
    group2: string;
  }


export interface Student {
  first_name: string;
  last_name: string;
}

export interface Attendance {
  id: number;
  student_id: number;
  first_name: string;
  last_name: string;
  present: boolean;
}

export interface ColumnStructure {
    name: string;
    width: string;
  }

export interface Filters {
    types: string[];
    camp: number;
    group: number;
}  