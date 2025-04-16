import { Game} from '../model';
import { GameSlice } from './GameSlice';
import { add_game, update_student_game, delete_student_game } from '../http';
import { getChanges, formatDateTime, objectToJson } from '../../../shared/utils';


export interface GamesSlice {
    games: Game[];
    isGamePopover: boolean;
    isGameDesc: boolean;

    game_id: number;
    gameColumn: string;

    gameValue: number;
    gameDesc: string;

    isGameModal: boolean;
    isGameUpdate: boolean;
    isGameDelete: boolean;

    setGames:(games: Game[]) => void; //student loaded
    selectGameCell:(game_id: number, gameColumn: string) => void;
    
    addGame:() => void;
    updateGameCell:(value: number) => void;
    updateGameDesc: (value: string) => void;
    updateGame:() => void;
    deleteGame:() => void;

    openUpdateGame:() => void;
    openDeleteGame:() => void;
    closeGameModal:() => void;
}

export const createGamesSlice = (set: any, get: any): GamesSlice => ({
    games:[
        {
            id: 0,
            student_id: 0,
            timestamp: 0,
            date: '',
            caughted: 5,
            freeded: 4,
        }
    ],
    isGamePopover: false,
    isGameDesc: false,
        
    game_id: 0,
    gameColumn: '',

    gameValue: 0,
    gameDesc: '',

    isGameModal: false,
    isGameUpdate: false,
    isGameDelete: false,

    setGames:(games: Game[]) => set({ games }),
    
    selectGameCell:(game_id: number, gameColumn: string) => {
        const { games, setGame }: GamesSlice & GameSlice = get();
        const game = games.find(item => item.id === game_id)!

        set({ game_id, gameColumn,
            isGamePopover: gameColumn === 'caughted' || gameColumn === 'freeded',
            isGameDesc: gameColumn === 'description'
        })
        setGame(game);
    },

    addGame:() => {
        const { getNewGame }: GameSlice = get();
        const newGame: Omit<Game, 'id'> = getNewGame();
        const timestamp = Date.now();
        newGame.timestamp = timestamp;
        newGame.date = formatDateTime(timestamp).date;
        alert(objectToJson(newGame));
        add_game(newGame, (res) => {
            if (res.id) {
                const game: Game = { ...newGame, id: res.id };
                set((state: GamesSlice) => ({ games: [ ...state.games, game] }));
            }     
        })
    },

    updateGameCell: (value: number) => {
        const { gameColumn, updateGame }: GamesSlice= get();
        const { setCaughted, setFreeded }: GameSlice = get();
        if (gameColumn === "caughted") setCaughted(value);
        if (gameColumn === "freeded") setFreeded(value);

        updateGame();
    },

    updateGameDesc: (value: string) => {
        const { updateGame,  setDesc}: GamesSlice & GameSlice = get();
        setDesc(value);
        updateGame();
    },

    updateGame:() => {
        const { getUpdatedGame, games, game_id }: GameSlice & GamesSlice= get();
        const updatedGame = getUpdatedGame();
        const game = games.find(item => item.id === game_id)!
        const data: Partial<Game> = getChanges(game, updatedGame);

        update_student_game(game.id, data, (res => {
            if (res.isOk) {
                set((state: GamesSlice) => ({
                    games: state.games.map(el => el.id === game.id ? updatedGame : el),
                }))
            }
        }));
    },

    deleteGame:() => {
        const { game_id }: GamesSlice= get();
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