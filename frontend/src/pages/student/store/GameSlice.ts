import {  Game } from '../model';
import { EventsSlice } from './EventsSlice';
import { StateSlice } from '../state';


export interface GameSlice {
    id: number;
    timestamp: number;
    date: string;
    caughted: number;
    freeded: number;
    description: string;

    setCaughted:(caughted: number) => void;
    setFreeded:(freeded: number) => void;
    setDesc:(description: string) => void;

    setGame: (game: Game) => void;
    getNewGame: () => Omit<Game, 'id'>;
    getUpdatedGame: () => Game;
}

export const createGameSlice = (set: any, get: any): GameSlice => ({
    id: 0,
    timestamp: 0,
    date: '',
    caughted: 0,
    freeded: 0,
    description: '',

    setCaughted:(caughted: number) => set({ caughted }),
    setFreeded:(freeded: number) => set({ freeded }),
    setDesc:(desc: string) => set({ desc }),

    setGame: ({ id, timestamp, caughted, freeded, description }: Game) =>
            set({ id, timestamp, caughted, freeded, description }),

    getNewGame:() => {
        const { student_id, timestamp, date, caughted, freeded, description }: StateSlice & EventsSlice & GameSlice = get();
        return { student_id, timestamp, date, caughted, freeded, description }
    },

    getUpdatedGame:() => {
        const { student_id, id, timestamp, date, caughted, freeded, description }: StateSlice & EventsSlice & GameSlice = get();
        return { student_id, id, timestamp, date, caughted, freeded, description }
    },
});