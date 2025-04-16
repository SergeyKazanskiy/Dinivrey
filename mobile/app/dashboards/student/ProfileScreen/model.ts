import { EventType } from "../../../shared/models/Event";

export interface Student {
    first_name: string;
    last_name: string;
    gender: string;
    age: number;
    active: boolean;
    city: string;
    street: string;
    house: string;
  }

  export interface Event {
    type: EventType;
    title: string;
    desc: string;
    date: string;
    time: string;
  }
  
  export interface Achievement {
    imageName: string;
  }