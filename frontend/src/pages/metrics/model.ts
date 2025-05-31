export interface Metric {
  id: number;
  camp_id: number;
  test: string;
  start: number;
  stop: number;
  score: number;
}

export interface Camp {
  id: number;
  name: string;
}

