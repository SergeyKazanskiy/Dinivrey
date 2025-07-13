import { Camp } from '../model';
import { StateSlice } from '../state';


export interface CampsSlice {
    camps: Camp[];
    camp_id: number;

    setCamps: (camps: Camp[]) => void;
}

export const createCampsSlice = (set: any, get: any): CampsSlice => ({
    camps: [],
    camp_id: 1,

    setCamps: (camps: Camp[])  => set({ camps, camp_id: 0 }),


});