import { Camp } from '../model';
import { StateSlice } from '../state';
import { LidersSlice } from './LidersSlice';
import { TestsSlice } from './TestsSlice';


export interface CampsSlice {
    camps: Camp[];

    campId: number;
    exam: string;

    setCamps: (camps: Camp[]) => void;
    selectCamp: (camp_id: number) => void;

    selectExam: (exam: string) => void;
}

export const createCampsSlice = (set: any, get: any): CampsSlice => ({
    camps: [],

    campId: 0,
    exam: 'speed',

    setCamps: (camps: Camp[])  => set({ camps, campId: 0 }),

    selectCamp: (camp_id: number) => {
        const { campId }: CampsSlice = get();

        if (camp_id === campId) {
             set({ campId: 0 });

             const { clearLiders, clearTests }: LidersSlice & TestsSlice = get();
             clearLiders();
             clearTests();
        } else if (campId === 0) {
            set({ campId: camp_id });

            const { loadLastDate, loadGroups }: StateSlice = get();
            loadLastDate(camp_id);
            loadGroups(camp_id);
        } else {
            set({ campId: camp_id });

            const { clearLiders, clearTests }: LidersSlice & TestsSlice = get();
            clearLiders();
            clearTests();

            const { loadLastDate, loadGroups }: StateSlice = get();
            loadLastDate(camp_id);
            loadGroups(camp_id);
        }
    },

    selectExam: (exam: string) => {
        set({ exam });
    },


});