import { Game} from '../model';
import { getChanges, formatDateTime, objectToJson } from '../../../shared/utils';


export interface GamesSlice {
    games: Game[];
    
    setGames:(games: Game[]) => void; //student loaded
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
    

    setGames:(games: Game[]) => set({ games }),
    
});