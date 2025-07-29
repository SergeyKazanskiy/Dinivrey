import { Game, Gamer  } from "../model";
import { get_event_game, get_game_players, delete_event_game } from '../http';
import { objectToJson } from "@/app/shared/utils";
import { ReportSlice } from '../GamingScreen/data';

export interface GameReportSlice {
    isGameDeleteAlert: boolean;
    isGameSuccessDeleteAlert: boolean;

    loadGame: (game_id: number) => void;
    loadGamers: (game_id: number) => void;
    deleteGame: (game_id: number) => void;

    showGameDeleteAlert: () => void;
    hideGameDeleteAlert: () => void;

    showGameSuccessDeleteAlert: () => void;
    hideGameSuccessDeleteAlert: () => void;
}

export const createGameReportSlice = (set: any, get: any): GameReportSlice => ({     
    isGameDeleteAlert: false,
    isGameSuccessDeleteAlert: false,

    loadGame: (game_id: number) => {
        get_event_game(game_id, (game: Game) => {
            const { setGameFromServer }: ReportSlice = get();
            setGameFromServer(game);

            get_game_players(game_id, (gamers => {
                set({ gamers });
                const { calculateWinner }: ReportSlice = get();
                calculateWinner();
            }))
        })
    },

    loadGamers: (game_id: number) => {
        get_game_players(game_id, (gamers: Gamer[]) => {
            set({gamers});
        })
    },

    deleteGame: (game_id: number) => {
        delete_event_game(game_id, (res) => {
            if (res.isOk) {
            }
        })
    },

    showGameDeleteAlert: () => set({ isGameDeleteAlert: true }),
    hideGameDeleteAlert: () => set({ isGameDeleteAlert: false }),

    showGameSuccessDeleteAlert: () => set({ isGameSuccessDeleteAlert: true }),
    hideGameSuccessDeleteAlert: () => set({ isGameSuccessDeleteAlert: false }),
});
