import { Test } from '../model';
import { getChanges, formatDateTime, objectToJson } from '../../../shared/utils';


export interface TestsSlice {
    tests: Test[];

    setTests:(tests: Test[]) => void; //student loaded
}

export const createTestsSlice = (set: any, get: any): TestsSlice => ({
    tests:[
        {
            id: 1,
            student_id: 0,
            timestamp: 0,
            date: '',
            speed: 5,
            stamina: 4,
            climbing: 4,
            evasion: 2,
            hiding: 7
        },
        {
            id: 2,
            student_id: 0,
            timestamp: 0,
            date: '',
            speed: 5,
            stamina: 6,
            climbing: 4,
            evasion: 2,
            hiding: 2
        },
        {
            id: 3,
            student_id: 0,
            timestamp: 0,
            date: '',
            speed: 4,
            stamina: 8,
            climbing: 2,
            evasion: 2,
            hiding: 5
        },
        {
            id: 4,
            student_id: 0,
            timestamp: 0,
            date: '',
            speed: 5,
            stamina: 8,
            climbing: 2,
            evasion: 2,
            hiding: 5
        }
    ],


    setTests:(tests: Test[]) => set({ tests }),

});
