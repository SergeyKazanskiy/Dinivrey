export enum EventType {
    Game='Game!',
    Test='Test!',
    Training='Training!'
}

export interface Game {
    id: number;
    name: string;
    score: string;
    details: string;
    time: string;
  
    caught: number;
    salvations: number;
    eviation_time: number;
  }
  
  export interface Event {
    id: number;
    type: EventType;
    title: string;
    desc: string;
    date: number;
    present: boolean;
  }