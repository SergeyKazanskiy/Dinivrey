import { Game, Team, TestGame } from '../model';
import { GameSlice } from './GameSlice';
import { add_game, update_test_game, delete_student_game } from '../http';
import { getChanges, formatDateTime, objectToJson } from '../../../shared/utils';
import { TestSlice } from './TestSlice';
import { StateSlice } from '../state';


export interface GamesSlice {
    games: Game[];
    isTestGames: boolean;

    game_id: number;
    gameColumn: string;

    gameValue: number; 
    gameDesc: string;

    isGameModal: boolean; //!!! only for test
    isGameUpdate: boolean; //!!! only for test
    isGameDelete: boolean; //!!! only for test

    setGames:(games: Game[]) => void;
    setTestGames:(games: TestGame[]) => void;

    togleTestGames:() => void; //!!! only for test
    selectGameCell:(game_id: number, gameColumn: string) => void; //!!! only for test
    
    addGame:() => void; //!!! only for test
    //updateGameCell:(value: number) => void;
    //updateGameDesc: (value: string) => void;
    updateGame:(value: number) => void; //!!! only for test
    deleteGame:() => void; //!!! only for test

    openUpdateGame:() => void; //!!! only for test
    openDeleteGame:() => void; //!!! only for test
    closeGameModal:() => void; //!!! only for test
}

export const createGamesSlice = (set: any, get: any): GamesSlice => ({
    games: [],
    isTestGames: false,
        
    game_id: 0,
    gameColumn: '',

    gameValue: 0,
    gameDesc: '',

    isGameModal: false,
    isGameUpdate: false,
    isGameDelete: false,

    setGames:(games: Game[]) => {
        const formated = games.map(el => ({...el, date: formatDateTime(el.timestamp).date}))
        set({ games: formated })
    },
    
    setTestGames:(games: TestGame[]) => {
        const timestamp = Date.now()
        const date = formatDateTime(timestamp).date

        const formated = games.map(el => ({...el, date, timestamp, team: Team.GREEN, won:  Team.GREEN}))
        set({ games: formated })
    },

    togleTestGames:() => {
        set((state: GamesSlice) => ({ isTestGames: !state.isTestGames}))

        const { loadGames, loadTestGames, isTestGames }: StateSlice & GamesSlice = get();
        if (isTestGames) {
            loadTestGames();
        } else {
            loadGames();
        }
    },

    selectGameCell:(game_id: number, gameColumn: string) => {
        const { games }: GamesSlice & GameSlice = get();
        const game = games.find(item => item.id === game_id)!
        set({ game_id, gameColumn, isGameModal: true, gameValue: game[gameColumn as keyof typeof game] })
    },

    addGame:() => { //!!! only for test
        const { getNewGame }: GameSlice = get();
        const newGame: Omit<TestGame, 'id'> = getNewGame();

       // alert(objectToJson(newGame));
        add_game(newGame, (res) => {
            if (res.id) {
                const timestamp = Date.now()
                const date = formatDateTime(timestamp).date

                const game: Game = { ...newGame, id: res.id, timestamp: Date.now(), date,
                    team: Team.GREEN, won:  Team.GREEN };
                set((state: GamesSlice) => ({ games: [ ...state.games, game] }));
            }     
        })
    },

    updateGame: (value: number) => {
        const { game_id, gameColumn, student_id }: StateSlice & GamesSlice = get();

        update_test_game(student_id, game_id, { [gameColumn]: value }, (res => {
            if (res) {
                set((state: GamesSlice) => ({
                    games: state.games.map(el => el.id === game_id ? {...el, [gameColumn]: value } : el),
                    isTestModal: false,
                }));

                const { loadAchieves }: StateSlice = get();
                alert(objectToJson(res.achievements))
                loadAchieves();
            }
        }));
    },

    deleteGame:() => {
        const { game_id }: GamesSlice= get();
        alert(game_id)
        delete_student_game(game_id, (res => {
            if (res.isOk) {
                set((state: GamesSlice) => ({ games: state.games.filter(el => el.id !== state.game_id) }));
            } 
        }));

        const { closeGameModal }: GamesSlice = get();
        closeGameModal();
    },

    openUpdateGame:() => set({isGameModal: true, isGameUpdate: true}),
    openDeleteGame:() => set({isGameModal: true, isGameDelete: true}),
    closeGameModal:() => set({isGameModal: false, isGameUpdate: false, isGameDelete: false}),
});