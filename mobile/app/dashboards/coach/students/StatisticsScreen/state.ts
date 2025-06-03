import { Test, Game, Metric } from "../model";
import { get_last_test_date, get_last_game_date, get_student_tests, get_student_games } from '../http';
import { update_student_tests_summary, update_student_games_summary } from '../http';
import { GroupsSlice } from '../GroupsScreen/state';
import { MeasureUnits } from '../../../../shared/constants';
import { objectToJson, getYearAndMonth, formatSeconds } from '../../../../shared/utils';
import { ProfileSlice } from "../ProfileScreen/state";


export interface StatisticsSlice {
    year: number;
    month: number;
    isTests: boolean;

    timestamp: number;
    metricName: string; 

    timestamps: number[]; 
    metrics: Metric[];
    
    isMainMetric: boolean;
    summary: string;

    loadStatistics: () => void;
    selectDate: (year: number, month: number) => void;
    togleStatistic: () => void;

    selectTimestamp: (timestamp: number) => void;
    selectMetric: (metricName: string) => void;

    loadTests: (student_id: number, year: number, month: number, metricName?: string) => void;
    loadGames: (student_id: number, year: number, month: number, metricName?: string) => void;

    loadTest: (timestamp: number, metricName: string) => void;
    loadGame: (timestamp: number, metricName: string) => void;

    setSummary:(summary: string) => void;
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
    summary:'',

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
            //alert(objectToJson(tests))
            if (tests.length > 0) {
                const metrics = convertTestsToMetrics(tests);
                const { student }: ProfileSlice = get();

                set((state: StatisticsSlice) => ({ 
                    timestamp: state.isMainMetric ? state.timestamp : tests[0].timestamp,
                    timestamps: tests.map(el => el.timestamp),
                    metricName,
                    metrics,
                    isMainMetric: false,
                    summary: student.summary_tests
                 }));
            } else {
                set({ metricName: '', timestamps: [], metrics: [], timestamp: 0, summary:'' });
            }
        })
    },

    loadGames: (student_id: number, year: number, month: number, metricName = 'Caughted') => {
        get_student_games(student_id, year, month, (games: Game[]) => {
            set({ isTests: false });

            if (games.length > 0) {
                const metrics = convertGamesToMetrics(games);
                const { student }: ProfileSlice = get();
                
                set((state: StatisticsSlice) => ({ 
                    timestamp: state.isMainMetric ? state.timestamp : games[0].timestamp,
                    timestamps: games.map(el => el.timestamp),
                    metricName,
                    metrics,
                    isMainMetric: false,
                    summary: student.summary_games
                 }));
            } else {
                set({ metricName: '', timestamps: [], metrics: [], timestamp: 0, summary:'' });
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

    setSummary:(summary: string) => {
        const { student_id, isTests }: GroupsSlice & StatisticsSlice = get();

        if (isTests) {
            update_student_tests_summary(student_id, {summary_tests: summary},(res => {
                if (res.isOk) {
                    set({summary});
                }
            }));
        } else {
            update_student_games_summary(student_id, {summary_games: summary},(res => {
                if (res.isOk) {
                    set({summary});
                }
            }));
        }
    }
});

  
function convertTestsToMetrics(tests: Test[]): Metric[] {
    const metrics: Metric[] = [];
    
    for (const test of tests) {
        const { timestamp, speed, stamina, climbing, evasion, hiding, speed_time, stamina_time, climbing_time } = test;
        
        metrics.push({ timestamp, name: 'Speed', score: speed, unit:'sec', time: formatSeconds(speed_time)});
        metrics.push({ timestamp, name: 'Stamina', score: stamina, unit:'min', time: formatSeconds(stamina_time)});
        metrics.push({ timestamp, name: 'Climbing', score: climbing, unit:'sec', time: formatSeconds(climbing_time)});
        metrics.push({ timestamp, name: 'Evasion', score: evasion, unit:'point', time:''});
        metrics.push({ timestamp, name: 'Hiding', score: hiding, unit:'point', time:''});
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

            metrics.push({ timestamp, name, score, unit, time:''});
        }
    }

    return metrics;
}