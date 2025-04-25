import { Test, Game } from "../model";
import { get_student_tests, get_student_games } from '../http';
import { ProfileSlice } from '../ProfileScreen/state';

export interface StatisticsSlice {
    tests: Test[];
    games: Game[];

    year: number;
    month: number;
    isTests: boolean;

    selectDate: (year: number, month: number) => void;
    loadTests: (student_id: number) => void;
    loadGames: (student_id: number) => void;
}

export const createStatisticsSlice = (set: any, get: any): StatisticsSlice => ({     
    tests: [],
    games: [],

    year: 2025,
    month: 3,
    isTests: true,

    selectDate: (year: number, month: number) => {
        set({ year, month });

        const { isTests, loadTests, loadGames, student_id }: StatisticsSlice & ProfileSlice = get();
        if (isTests) {
            loadTests(student_id);
        } else {
            loadGames(student_id); 
        } 
    },

    loadTests: (student_id: number) => {
        const { year, month }: StatisticsSlice = get() ;

        get_student_tests(student_id, year, month, (tests: Test[]) => {
            set({ tests });
        })
    },

    loadGames: (student_id: number) => {
        const { year, month }: StatisticsSlice = get() ;

        get_student_games(student_id, year, month, (games: Game[]) => {
            set({ games });
        })
    },
});
