import { Game, Gamer } from '../model';
import { objectToJson } from '../../../../shared/utils';
import { get_games, get_game_players, add_student_game, add_student_game_gamers, delete_student_game } from '../http';
import { EventsSlice } from '../EventsScreen/state';
import { getTodayTimestamp } from '../../../../shared/utils';


export interface ReportSlice {
    games: Game[];
    gamers: Gamer[];

    gameDate: number;
    first_team: "Green" | "Red";

    timerSartTime: number; 
    round_times: number[];
    
    total_points: number;
    total_tags: number;
    total_rescues: number;

    winner: "Green" | "Red";

   
    loadGames: (event_id: number, group_id: number) => void; // not there!!! 
    loadGamers: (game_id: number) => void;

    setGameDate: () => void;
    setFirstTeam: (first_team: "Green" | "Red") => void;
    setRoundTime: (round: number, time: number) => void;

    createGame: () => void;
    addGame: (callback: (isOk: boolean) => void) => void ;

    deleteGame: (game_id: number) => void;
    clearGame: () => void;
}

export const createReportSlice = (set: any, get: any): ReportSlice => ({
    games: [],
    gamers: [],

    gameDate: 0,
    first_team: "Green",

    timerSartTime: 0, 
    round_times: [600, 600],
    
    total_points: 0,
    total_tags: 0,
    total_rescues: 0,

    winner: "Green",
   
//       team: 'Green' | 'Red';
//   caughted: number; points(role: )
//   freeded: number; points()
//   is_survived: boolean;
    // rounds: [
    //     {
    //     team: 'Red',
    //     role: 'Evader',
    //     round: 1,
    //     players: [
    //         { name: 'Player 1', status: 'Survived', points: 13 },
    //         { name: 'Player 1', status: 'Caught', points: 7 },
    //         { name: 'Player 1', status: 'Caught', points: 4 },
    //         { name: 'Player 1', status: 'Survived', points: 3 },
    //         { name: 'Player 1', status: 'Survived', points: 2 },
    //         { name: 'Player 1', status: 'Caught', points: 0 },
    //     ],
    // ],

    loadGames: (event_id: number, group_id: number) => {
        get_games(event_id, group_id, (games: Game[]) => {
            set({games});
        })
    },

    loadGamers: (game_id: number) => {
        get_game_players(game_id, (gamers: Gamer[]) => {
            set({gamers});
        })
    },


    setGameDate: () => set({ gameDate: getTodayTimestamp()}),
    setFirstTeam: (first_team: "Green" | "Red") => set({ first_team }),

    setRoundTime: (round: number, time: number) => set((state: ReportSlice) => {
        const updated = [...state.round_times];
        updated[round - 1] = time;
        return { round_time: updated };
    }),

    createGame: () => {
        const { event_id, group_id }: EventsSlice = get();
        const { gameDate, first_team, round_times }: ReportSlice = get();
        const { total_points, total_rescues, total_tags, winner }: ReportSlice = get();

        const game: Omit<Game, 'id'> = {
            event_id,  group_id, timestamp: gameDate, first_team,
            time1: round_times[0], time2: round_times[1],
            points: total_points, tags: total_rescues, rescues: total_tags, winner
        }
    },

    addGame: (callback) => {
        const { event_id, group_id }: EventsSlice = get();
        const { first_team, round_times, total_points, total_rescues, total_tags }: ReportSlice = get();

        const data: Omit<Game, 'id'> = {
            event_id,  group_id, timestamp: 0, first_team,
            time1: round_times[0], time2: round_times[1],
            points: total_points, tags: total_rescues, rescues: total_tags,
            winner: 'Green'
        }
        add_student_game(data, (res => {
            if (res.id > 0) {
                const { gamers }: ReportSlice = get();
                const complitedGamers: Gamer[] = gamers.map(el => ({...el, id: res.id}))

                add_student_game_gamers(complitedGamers, (res => {
                    callback(res.isOk);
                }));
            }
        }));
    },

    deleteGame: (game_id: number) => {
        delete_student_game(game_id, (res) => {
            if (res.isOk) {
                const {clearGame}: ReportSlice = get();
                clearGame();
            }
        })
    },

    clearGame: () => set({
        gamers: [],
        first_team: "Green",
        round_time: [600, 600],
        total_points: 0,
        total_tags: 0,
        total_rescues: 0,
        winner: "Green",
    }),
});

