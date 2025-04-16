import { Student, Event, Achievement} from "../student/ProfileScreen/model";
import { EventType } from "../../shared/models/Event";

export const student: Student = {
    first_name: "FirstName",
    last_name: "LastName",
    gender: "Girl",
    age: 10,
    active: true,
    city: "City",
    street: "Street",
    house: "18",
  };

  export const profile_achievements: Achievement[] = [
    {
      imageName: "Evasion skill icon",
    },
  ];

  export const achievements: Achievement[] = [];

  export const events: Event[] = [
    {
      type: EventType.Game,
      title: "Super game",
      desc: "We going to win group 1",
      date: "Fri 5",
      time: "16:00",
    },
  ];

// store/useAppStore.ts
/*
import create from 'zustand';

interface Player {
  id: number;
  name: string;
  team: string;
  scores: number[];
  finalScore: number;
}

interface Game {
  id: number;
  name: string;
  score: string;
  details: string;
  time: string;
}

interface AppState {
  players: Player[];
  games: Game[];
  setPlayers: (players: Player[]) => void;
  setGames: (games: Game[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  players: [
    {
      id: 1,
      name: 'Student Name',
      team: 'Student Team',
      scores: [5.3, 7.4, 9.1, 4.8, 9.6],
      finalScore: 4.9,
    },
    {
      id: 2,
      name: 'Student Name 2',
      team: 'Student Team',
      scores: [6.3, 8.4, 7.1, 5.8, 8.6],
      finalScore: 5.1,
    },
  ],
  games: [
    {
      id: 1,
      name: 'Wall Tag',
      score: '30 / 100',
      details: 'Batliaser High School city: Hadera',
      time: 'Fri, 02 Jul 17:00',
    },
    {
      id: 2,
      name: 'Wall Tag 2',
      score: '45 / 100',
      details: 'Another High School city: Tel Aviv',
      time: 'Sat, 03 Jul 18:00',
    },
  ],
  setPlayers: (players) => set(() => ({ players })),
  setGames: (games) => set(() => ({ games })),
}));
*/