import { Test, Game, Metric } from "../model";
import { get_last_test_date, get_last_game_date, get_student_tests, get_student_games } from '../http';
import { GroupsSlice } from '../GroupsScreen/state';
import { MeasureUnits } from '../../../../shared/constants';
import { objectToJson, getYearAndMonth } from '../../../../shared/utils';


export interface StatisticsSlice {
    year: number;
    month: number;
    isTests: boolean;

    timestamp: number;
    metricName: string; 

    timestamps: number[]; 
    metrics: Metric[];
    
    isMainMetric: boolean;

    loadStatistics: () => void;
    selectDate: (year: number, month: number) => void;
    togleStatistic: () => void;

    selectTimestamp: (timestamp: number) => void;
    selectMetric: (metricName: string) => void;

    loadTests: (student_id: number, year: number, month: number, metricName?: string) => void;
    loadGames: (student_id: number, year: number, month: number, metricName?: string) => void;

    loadTest: (timestamp: number, metricName: string) => void;
    loadGame: (timestamp: number, metricName: string) => void;
}

export const createStatisticsSlice = (set: any, get: any): StatisticsSlice => ({
    year: 2025,
    month: 3,
    isTests: true,

    timestamp: 0,
    metricName: '',

    timestamps: [], 
    metrics: [],

    isMainMetric: false,


    loadStatistics: () => {
        const { student_id, isMainMetric }: GroupsSlice & StatisticsSlice = get();

        if (isMainMetric) {
            const { isTests, year, month, metricName }: StatisticsSlice = get();
           
            if (isTests) {
                get().loadTests( student_id, year, month, metricName);
            } else {
                get().loadGames( student_id, year, month, metricName); 
            } 
        } else {
            get_last_test_date(student_id, (res => {
                set({ year: res.year, month: res.month });
            
                if (res.isEvents) {
                    get().loadTests( student_id, res.year, res.month);
                }
            }));
        }
    },

    selectDate: (year: number, month: number) => {
        set({ year, month });

        const { isTests, student_id }: StatisticsSlice & GroupsSlice = get();
        if (isTests) {
            get().loadTests( student_id, year, month);
        } else {
            get().loadGames( student_id, year, month); 
        } 
    },

    togleStatistic: () => {
        const { student_id, isTests }: StatisticsSlice & GroupsSlice = get();
       // alert(isTests)
        if (isTests) {
            get_last_game_date(student_id, (res => {
                set({ year: res.year, month: res.month });

                if (res.isEvents) {
                    get().loadGames( student_id, res.year, res.month);
                }
            }));
        } else {
            get_last_test_date(student_id, (res => {
                set({ year: res.year, month: res.month });

                if (res.isEvents) {
                    get().loadTests( student_id, res.year, res.month);
                }
            }));
        }
    },

    selectTimestamp: (timestamp: number) => set({ timestamp }),
    selectMetric: (metricName: string) => set({ metricName }),

    loadTests: (student_id: number, year: number, month: number, metricName = 'Speed') => {
        get_student_tests(student_id, year, month, (tests: Test[]) => {
            set({ isTests: true });

            if (tests.length > 0) {
                const metrics = convertTestsToMetrics(tests);

                set((state: StatisticsSlice) => ({ 
                    timestamp: state.isMainMetric ? state.timestamp : tests[0].timestamp,
                    timestamps: tests.map(el => el.timestamp),
                    metricName,
                    metrics,
                    isMainMetric: false
                 }));
            } else {
                set({ metricName: '', timestamps: [], metrics: [], timestamp: 0 });
            }
        })
    },

    loadGames: (student_id: number, year: number, month: number, metricName = 'Caughted') => {
        get_student_games(student_id, year, month, (games: Game[]) => {
            set({ isTests: false });

            if (games.length > 0) {
                const metrics = convertGamesToMetrics(games);
       
                set((state: StatisticsSlice) => ({ 
                    timestamp: state.isMainMetric ? state.timestamp : games[0].timestamp,
                    timestamps: games.map(el => el.timestamp),
                    metricName,
                    metrics,
                    isMainMetric: false
                 }));
            } else {
                set({ metricName: '', timestamps: [], metrics: [], timestamp: 0 });
            }
        })
    },

    loadTest: (timestamp: number, metricName: string) => {
        const { year, month } = getYearAndMonth(timestamp);
        set({ isTests: true, year, month, metricName, timestamp, isMainMetric: true})
    },

    loadGame: (timestamp: number, metricName: string) => {
        const { year, month } = getYearAndMonth(timestamp);
        set({ isTests: false, year, month, metricName, timestamp, isMainMetric: true })
    }
});

  
function convertTestsToMetrics(tests: Test[]): Metric[] {
    const metrics: Metric[] = [];

    for (const test of tests) {
        const { id, timestamp, ...fields } = test;
        
        for (const key of Object.keys(fields) as (keyof typeof fields)[]) {
            const name = key.charAt(0).toUpperCase() + key.slice(1);
            const score = test[key];
            const unit = MeasureUnits[name];

            metrics.push({ timestamp, name, score, unit, });
        }
    }

    return metrics;
}
  
function convertGamesToMetrics(tests: Game[]): Metric[] {
    const metrics: Metric[] = [];

    for (const test of tests) {
        const { id, timestamp, ...fields } = test;

        for (const key of Object.keys(fields) as (keyof typeof fields)[]) {
            const name = key.charAt(0).toUpperCase() + key.slice(1);
            const score = test[key];
            const unit = MeasureUnits[name];

            metrics.push({ timestamp, name, score, unit, });
        }
    }

    return metrics;
}