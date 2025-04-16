export interface Camp {
  id: number;
  name: string;
}

export interface Group {
  id: number;
  camp_id: number;
  name: string;
}

export interface CoacheInfo {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    active: boolean;
  }

export interface Group {
  name: string;
  attendance: string;
  tests: string;
  games: string;
}

export interface Event {
  name: string;
  date: string;
}