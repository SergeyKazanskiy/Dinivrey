export interface Drill {
    id: number;
    name: string;
    time: string;
    level: string;
    link: string;
    desc: string;
}

export interface ShortDrill {
  id: number;
  name: string;
  time: number;
  level: string;
}

export interface ColumnStructure {
    name: string;
    width: string;
}
