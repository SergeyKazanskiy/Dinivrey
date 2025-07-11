import { get_achieves, get_student_attendance, get_student_games} from './http';
import { Camp, Attendance, Test, Game, Achieve } from './model';


export interface StateSlice {
    camps: Camp[];
    camp_id: number;
    camp_inx: number;

    loadCamps: () => void;
    selectCamp: (camp_id: number, camp_inx: number) => void;

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


    loadCamps: () => {},

    selectCamp: (camp_id: number, camp_inx: number) => set(camp_id, camp_inx),


    loadAttendance: (camp_id: number) => {},

    loadTests: (camp_id: number) => {},

    loadGames: (camp_id: number) => {},

    loadAchieves: (camp_id: number) => {},

    loadLiders: (camp_id: number) => {},
});