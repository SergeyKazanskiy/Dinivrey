import { Game, Gamer, Team } from '../model';
import { objectToJson } from '../../../../shared/utils';
import { get_games, get_game_players, add_student_game, add_student_game_gamers, delete_student_game } from '../http';
import { EventsSlice } from '../EventsScreen/state';
import { getTodayTimestamp } from '../../../../shared/utils';
import { GamingSlice } from './state';


export interface ReportSlice {
    // Data
    //games: Game[];
    game: Game;
    gamers: Gamer[];

    // Setup
    gameDate: number;
    first_chaser_team: Team;
    timerSartTime: number; 

    // Temp
    survived_ids: number[];
    bonus_points: number;
    
    // Result
    total_points: number;
    total_tags: number;
    total_rescues: number;

    round_times: number[];
    winner: Team;

    // Loads
    //loadGames: (event_id: number, group_id: number) => void; // not there!!! 
    loadGamers: (game_id: number) => void;

    // Setters
    setGameDate: () => void;
    setFirstShaserTeam: (first_chaser_team: Team) => void;
    setRoundTime: (round: number, time: number) => void;

    setServivied: (survived_ids: number[]) => void; // From EvadersDialog
    setBonusPoints: (bonus_points: number) => void; // From EvadersDialog

    // Prepare
    createGamers: () => void; // First round finished (Waiting state)
    updateGamers: (evaders_ids: number[]) => void; // Second round finished (Report step)

    prepareGame: () => void; // before opening the report (Report step)

    // Server with
    saveGame: (callback: (isOk: boolean) => void) => void ; // after closing the report (Report step)
    deleteGame: (game_id: number) => void;
    clearGame: () => void;
}

export const createReportSlice = (set: any, get: any): ReportSlice => ({
    // Data
    //games: [],
    game: {
        id: 0,
        event_id: 0,
        group_id: 0,
        timestamp: 0,
        first_team: Team.GREEN,

        time1: 600,
        time2: 600,
        
        points: 10,
        tags: 20,
        rescues: 30,
        winner: Team.GREEN
    },
    gamers: [],

    // Setup
    gameDate: 0,
    first_chaser_team: Team.GREEN,
    timerSartTime: 0, 

    // Temp
    survived_ids: [],
    bonus_points: 0,

    // Result
    total_points: 0,
    total_tags: 0,
    total_rescues: 0,

    round_times: [600, 600],
    winner: Team.GREEN,
   
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

    // Loads
    // loadGames: (event_id: number, group_id: number) => {
    //     get_games(event_id, group_id, (games: Game[]) => {
    //         set({games});
    //     })
    // },

    loadGamers: (game_id: number) => {
        get_game_players(game_id, (gamers: Gamer[]) => {
            set({gamers});
        })
    },

    // Setters
    setGameDate: () => set({ gameDate: getTodayTimestamp()}),
    setFirstShaserTeam: (first_chaser_team: Team) => set({ first_chaser_team }),

    setRoundTime: (round: number, time: number) => set((state: ReportSlice) => {
        const updated = [...state.round_times];
        updated[round - 1] = time;
        return { round_time: updated };
    }),

    setServivied: (survived_ids: number[]) => set({ survived_ids }),
    setBonusPoints: (bonus_points: number) => set({ bonus_points }),

    // Prepare
    createGamers: () => { // 1 round
        const { players, survived_ids, first_chaser_team }: GamingSlice & ReportSlice = get();

        const gamers: Gamer[] = players.map(el => ({
            student_id: el.id,
            name: el.name,
            team: el.team,
            caught: el.team === first_chaser_team ? el.points : 0,
            freeded: el.team !== first_chaser_team ? el.points : 0,
            is_survived: survived_ids.includes(el.id)
        }));
        set({ gamers });
    },

    updateGamers: () => { // 2 round
        const { gamers, players, survived_ids, first_chaser_team }: GamingSlice & ReportSlice = get();
        const updated = gamers.map((gamer, index) => {
            const player = players[index];
            const isChaser = gamer.team !== first_chaser_team;
            
            return {
                ...gamer,
                caught: isChaser ? player.points : gamer.caught,
                freeded: !isChaser ? player.points : gamer.freeded,
                is_survived: !isChaser ? survived_ids.includes(player.id) : gamer.is_survived,
            };
        });

        set({ gamers: updated });
    },

    prepareGame: () => {
        
    },

    // Server
    saveGame: (callback) => {
        const { event_id, group_id }: EventsSlice = get();
        const { gameDate, first_chaser_team, round_times }: ReportSlice = get();
        const { total_points, total_rescues, total_tags, winner }: ReportSlice = get();

        const data: Omit<Game, 'id'> = {
            event_id,  group_id, timestamp: gameDate, first_team: first_chaser_team,
            time1: round_times[0], time2: round_times[1],
            points: total_points, tags: total_rescues, rescues: total_tags, winner
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

