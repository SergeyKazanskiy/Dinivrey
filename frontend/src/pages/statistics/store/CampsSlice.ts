import { Camp } from '../model';
import { StateSlice } from '../state';


export interface CampsSlice {
    camps: Camp[];

    campId: number;
    exam: string;

    setCamps: (camps: Camp[]) => void;
    selectCamp: (campId: number) => void;

    selectExam: (exam: string) => void;
}

export const createCampsSlice = (set: any, get: any): CampsSlice => ({
    camps: [],

    campId: 0,
    exam: 'speed',

    setCamps: (camps: Camp[])  => set({ camps, campId: 0 }),

    selectCamp: (campId: number) => {
        set({ campId });

        const { loadGroups }: StateSlice = get();
        loadGroups(campId);
    },

    selectExam: (exam: string) => {
        set({ exam });
    },


});