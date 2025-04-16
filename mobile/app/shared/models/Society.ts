export interface Camp {
    id: number;
    title: string;
    sity: string;
  }
  
  export interface Group {
    id: number;
    camp_id: number;
    coach_id: number;
    title: string;
    desc: string;
    date: number;
  }