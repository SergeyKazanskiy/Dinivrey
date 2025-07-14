import { Test, Group, GroupTest } from '../model';
import { getChanges, formatDateTime, objectToJson } from '../../../shared/utils';
import { StateSlice } from '../state';
import { CampsSlice } from './CampsSlice';


export interface TestsSlice {
    groups: Group[];
    tests: GroupTest[];

    year: number;
    month: number;

    setGroups:(groups: Group[]) => void;
    setTests:(tests: GroupTest[]) => void;
    selectDate: (year: number, month: number ) => void;
}

export const createTestsSlice = (set: any, get: any): TestsSlice => ({
    tests:[],
    groups: [],

    year: 2025,
    month: 5,

    setGroups:(groups: Group[]) => set({ groups }),
    setTests:(tests: GroupTest[]) => set({ tests }),

    selectDate: (year: number, month: number) => {
        set({ year, month }); 

        const { loadTests, campId}: StateSlice & CampsSlice = get();
        loadTests(campId, year, month);
    },
});
