import { Student, Player, Game, StudentGame } from '../model';
import { objectToJson } from '../../../../shared/utils';
import { get_games, get_game_players, add_student_game, add_student_game_players, delete_student_game } from '../http';


export interface ReportSlice {
    games: Game[];
    studentGames: StudentGame[];

    first_team: "Green" | "Red";
    time1: number;
    time2: number;
    
    points: number;
    tags: number;
    rescues: number;
    winner: "Green" | "Red";

   
    loadGames: (event_id: number, group_id: number) => void;
    loadPlayers: (game_id: number) => void;

    setTime1: (time1: number) => void;
    setTime2: (time1: number) => void;

    createGame: () => void;
    addGame: (game_id: number) => void;
    deleteGame: (game_id: number) => void;
}

export const createReportSlice = (set: any, get: any): ReportSlice => ({
    game: undefined,
    studentGame: [],
   
    loadGames: () => {
        get_games(event_id, group_id, (games: Game[]) => {
            //alert(objectToJson(testers));
            const participants = testers.map(el => ({...el, participate: true}))
            set({ exam: 'speed', testers: participants });
        })
    },

    addGame: (game_id: number) => {

    },

    deleteGame: (game_id: number) => {
        
    },
});

// export function get_games(event_id: number, group_id: number, callback: (games: Game[]) => void) {
//     return httpWrapper(() => api.get(`camps/events/${event_id}/groups/${group_id}/games`), callback, 'Getting event games');
// };

// export function add_student_game(data: Omit<Game, 'id'>, callback: (res: {id: number}) => void) {
//     return httpWrapper(() => api.post(`students/games`, data), callback, 'Add new game to event');
// };

// export function add_student_game_players(data: StudentGame[], callback: (res: {id: number}) => void) {
//     return httpWrapper(() => api.post(`students/games/players`, data), callback, 'Add all players to game');
// };

// export function delete_student_game(id: number, callback: (res: {isOk: boolean}) => void) {
//     return httpWrapper(() => api.delete(`students/games/${id}`), callback, 'Delete game with its players');
// };