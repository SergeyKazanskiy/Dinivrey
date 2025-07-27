import { Store } from "../store";
import { GameReport } from "../model";
import { get_last_game_date, get_student_game_reports } from '../http';
import { objectToJson } from '../../../shared/utils';
import { ProfileSlice } from '../ProfileScreen/state';


export interface GameReportsSlice {
    game_year: number;
    game_month: number;

    game_reports: GameReport[];
    game_report_id: number;

    loadLastGameReport: () => void;
    loadGameReports: () => void;

    selectGameDate: (year: number, month: number) => void;
    selectGameReport: (game_report_id: number) => void;
}

export const createGameReportsSlice = (set: any, get: () => Store): GameReportsSlice => ({
    game_year: 2025,
    game_month: 3,
    
    game_reports: [],
    game_report_id: 0,

    loadLastGameReport: () =>  {
        const { student_id }: ProfileSlice = get();

        get_last_game_date(student_id, (res => {
            if (res.isEvents) {
                const { selectGameDate, loadGameReports }: GameReportsSlice = get();

                selectGameDate(res.year, res.month)
                loadGameReports();
            }
        }));
    },
    
    loadGameReports: () => {
        const { student_id, game_year, game_month }: ProfileSlice & GameReportsSlice = get();

        get_student_game_reports(student_id, game_year, game_month, (game_reports) => {
            set({ game_reports });
        })
    },

    selectGameDate: (year: number, month: number) => {
        set({ game_year: year, game_month: month });

        const { loadGameReports }: GameReportsSlice = get();
        loadGameReports();
    },
    selectGameReport: (game_report_id: number) => set({ game_report_id }),
});
