import { omitThemingProps } from '@chakra-ui/react';
//import { get_student_events } from '../http';
import { TestsSlice } from './TestsSlice';
import { GamesSlice } from './GamesSlice';
import { StateSlice } from '../state';


export interface EventsSlice {
    year: number;
    month: number;

    selectDate:(year: number, month: number) => void;
}

export const createEventsSlice = (set: any, get: any): EventsSlice => ({
    year: 2020,
    month: 1,

    selectDate: (year: number, month: number) => {
        set({ year, month });
        
        const { loadTests, loadGames }: StateSlice = get();
        loadTests();
        loadGames();    
    },
});