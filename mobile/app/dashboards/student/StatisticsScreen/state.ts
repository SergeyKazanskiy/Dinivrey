import { Test, Game } from "../model";
import { get_student_tests, get_student_games } from '../http';
import { ProfileSlice } from '../ProfileScreen/state';
import { Metric } from '../model';

export interface StatisticsSlice {
    year: number;
    month: number;

    tests: Test[];
    games: Game[];

    isTests: boolean;
    metrics: Metric[];

    togleStatictic: () => void;
    selectMetric: (metric: string) => void;

    selectDate: (year: number, month: number) => void;
    loadTests: (student_id: number) => void;
    loadGames: (student_id: number) => void;
}

export const createStatisticsSlice = (set: any, get: any): StatisticsSlice => ({     
    tests: [],
    games: [],

    metri: {},
    currentGame: {},

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
