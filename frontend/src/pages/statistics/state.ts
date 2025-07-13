import { objectToJson } from '../../shared/utils';
import { get_achieves, get_camps, get_student_games} from './http';
import { Camp, Attendance, Test, Game, Achieve } from './model';
import { CampsSlice } from './store/CampsSlice';


export interface StateSlice {
    camps: Camp[];
    camp_id: number;
    camp_inx: number;

    loadCamps: () => void;

    loadTests: (camp_id: number) => void;
    loadGames: (camp_id: number) => void;
    loadAchieves: (camp_id: number) => void;
    loadLiders: (camp_id: number) => void;
    loadAttendance: (camp_id: number) => void;
}

export const createStateSlice = (set: any, get: any): StateSlice => ({
    camps: [],
    camp_id: 0,
    camp_inx: 0,


    loadCamps: () => {
        get_camps((camps => {
            //alert(objectToJson(camps))
            const { setCamps }: CampsSlice = get();
            
            if (camps.length > 0) {
                setCamps(camps);
            }
        }));
    },


    loadAttendance: (camp_id: number) => {},

    loadTests: (camp_id: number) => {},

    loadGames: (camp_id: number) => {},

    loadAchieves: (camp_id: number) => {},

    loadLiders: (camp_id: number) => {},
});