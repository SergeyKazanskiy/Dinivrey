export interface Camp {
  id: number;
  name: string;
}

export interface Group {
  id: number;
  camp_id: number;
  name: string;
}

export interface Coach {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  active: boolean;
  signature: string | undefined;
  camp_id: number;
}

export interface CoachShort {
  id: number;
  first_name: string;
  last_name: string;
}
