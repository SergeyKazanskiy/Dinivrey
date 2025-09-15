import { Test, Game, Metric } from "../model";
import { get_last_test_date, get_last_game_date, get_student_tests, get_student_games, get_last_tests_limit } from '../http';
import { ProfileSlice } from '../ProfileScreen/state';
import { MeasureUnits } from '../../../shared/constants';
import { objectToJson, getYearAndMonth, formatSeconds, formatSecondsWithMilli } from '../../../shared/utils';


export interface StatisticsSlice {
    year: number;
    month: number;
    isTests: boolean;

    timestamp: number;
    metricName: string; 

    timestamps: number[]; 
    metrics: Metric[];
    metrics_modal: Metric[];
    
    isMainMetric: boolean;
    isExamChartModal: boolean;

    loadStatistics: () => void;
    selectDate: (year: number, month: number) => void;
    togleStatistic: () => void;

    selectTimestamp: (timestamp: number) => void;
    selectMetric: (metricName: string) => void;

    loadTests: (student_id: number, year: number, month: number, metricName?: string) => void;
    loadGames: (student_id: number, year: number, month: number, metricName?: string) => void;

    loadTest: (timestamp: number, metricName: string) => void;
    loadGame: (timestamp: number, metricName: string) => void;

    loadLimitTests: (student_id: number, limit: number) => void;

    showExamChartModal: (metricName: string) => void;
    hideExamChartModal: () => void;
}

export const createStatisticsSlice = (set: any, get: any): StatisticsSlice => ({
    year: 2025,
    month: 3,
    isTests: true,

    timestamp: 0,
    metricName: 'Speed',

    timestamps: [], 
    metrics: [],
    metrics_modal: [],

    isMainMetric: false,
    isExamChartModal: false,


    loadStatistics: () => {
        const { student_id, isMainMetric }: ProfileSlice & StatisticsSlice = get();

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

        const { metricName, student_id }: StatisticsSlice & ProfileSlice = get();
       // if (isTests) {
            get().loadTests( student_id, year, month, metricName);
       // } else {
       //     get().loadGames( student_id, year, month); 
       // } 
    },

    togleStatistic: () => {
        const { student_id, isTests }: StatisticsSlice & ProfileSlice = get();
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
                const metrics_modal = convertTestsToMetrics(tests);

                set((state: StatisticsSlice) => ({ 
                    timestamp: state.isMainMetric ? state.timestamp : tests[0].timestamp,
                    timestamps: tests.map(el => el.timestamp),
                    metricName,
                    metrics_modal,
                    isMainMetric: false
                 }));
            } else {
                set({ metricName: 'Speed', timestamps: [], metrics_modal: [], timestamp: 0 });
            }
        })
    },

    loadGames: (student_id: number, year: number, month: number, metricName = 'Caught') => {
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
    },

    loadLimitTests: (student_id2: number, limit: number) => {
        const { student_id }: ProfileSlice = get();

        get_last_tests_limit(student_id, limit, (tests: Test[]) => {
            //alert(objectToJson(tests))
            if (tests.length > 0) {
                const metrics = convertTestsToMetrics(tests);
                //alert(objectToJson(metrics))
                set((state: StatisticsSlice) => ({ 
                    metrics,
                    metrics_modal: metrics
                 }));
            } else {
                set({ metricName: '', timestamps: [], metrics: [], timestamp: 0 });
            }
        });
    },

    showExamChartModal:(metricName: string) => {
        const { student_id }: ProfileSlice = get();
        
        get_last_test_date(student_id, (res => {
            set({ year: res.year, month: res.month });
        
            if (res.isEvents) {
                get().loadTests( student_id, res.year, res.month, metricName);
            }
        }));
        set({isExamChartModal: true, metricName})
    },
    hideExamChartModal:() => set({isExamChartModal: false,}),
});

  
function convertTestsToMetrics(tests: Test[]): Metric[] {
    const metrics: Metric[] = [];
    
    for (const test of tests) {
        const { timestamp, speed, stamina, climbing, evasion, hiding, speed_time, stamina_time, climbing_time } = test;
        
        metrics.push({ timestamp, name: 'Speed', score: speed, unit:'sec', time: formatSeconds(speed_time)});
        metrics.push({ timestamp, name: 'Stamina', score: stamina, unit:'min', time: formatSecondsWithMilli(stamina_time)});
        metrics.push({ timestamp, name: 'Climbing', score: climbing, unit:'sec', time: formatSeconds(climbing_time)});
        metrics.push({ timestamp, name: 'Evasion', score: evasion, unit:'point', time:''});
        metrics.push({ timestamp, name: 'Hiding', score: hiding, unit:'point', time:''});
    }
    return metrics;
}
  
function convertGamesToMetrics(games: Game[]): Metric[] {
    const metrics: Metric[] = [];

    for (const game of games) {
        const { timestamp, caught, freeded, is_survived } = game;

        metrics.push({ timestamp, name: 'Caught', score: caught, unit:'point', time: ''});
        metrics.push({ timestamp, name: 'Freeded', score: freeded, unit:'point', time: ''});
        metrics.push({ timestamp, name: 'Survived', score: is_survived ? 2 : 0, unit:'point', time: ''});
    }
    return metrics;
}
