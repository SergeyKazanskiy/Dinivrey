import {  Game, TestGame } from '../model';
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
    getNewGame: () => Omit<TestGame, 'id'>;
    // getUpdatedGame: () => Game;
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

    setGame: ({ id, timestamp, caught, freeded, is_survived }: Game) =>
            set({ id, timestamp, caught, freeded, is_survived }),

    getNewGame:() => {
        const { student_id }: StateSlice = get();
        return { game_id: 1, student_id, name: 'Test Student',
            team: 'Green', caught: 0, freeded: 0, is_survived: 0 }
    },

    // getUpdatedGame:() => {
    //     const { student_id, id, timestamp, date, caughted, freeded, description }: StateSlice & EventsSlice & GameSlice = get();
    //     return { student_id, id, timestamp, date, caughted, freeded, description }
    // },
});