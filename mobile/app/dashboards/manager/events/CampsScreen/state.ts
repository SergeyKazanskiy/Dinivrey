import { Camp } from '../model';
import { get_camps } from '../http';
import { objectToJson, getCurrentYear, getCurrentMonth } from "../../../../shared/utils";


export interface CampsSlice {
    year: number;
    month: number;

    camps: Camp[];
    camp_id: number;

    selectDate: (year: number, month: number) => void;

    loadCamps: () => void;
    selectCamp: (camp_id: number) => void;
}

export const createCampsSlice = (set: any, get: any): CampsSlice => ({
    year: getCurrentYear(),
    month: getCurrentMonth(),

    camps: [],
    camp_id: 0,
    
    selectDate: (year: number, month: number) =>  set({year, month}),

    loadCamps: () => { 
        get_camps((camps => {
            set({camps});
        }));
    },

    selectCamp: (camp_id: number) => set({camp_id}),

});
