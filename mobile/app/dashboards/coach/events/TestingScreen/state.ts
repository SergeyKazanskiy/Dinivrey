import { Store } from "../store";
import { Tester } from "../model";
import { get_testers} from '../http';
import { NumericFields, objectToJson } from '../../../../shared/utils';
import { EventsSlice } from '../EventsScreen/state';


export interface TestingSlice {
    testers: Tester[];

    exams: NumericFields<Tester>[];
    exam: NumericFields<Tester>;
    
    loadTesters: () => void;
    selectExam: (test: NumericFields<Tester>) => void;

    selectTesterExam: (student_id: number) => void;
    updateTesterExam: (student_id: number) => void;

    isAlert: boolean;
    setIsAlert: (isAlert: boolean) => void;
}

export const createTestingSlice = (set: any, get: () => Store): TestingSlice => ({
    testers: [],
    exam: 'speed',       
    exams: ['speed', 'stamina', 'climbing', 'evasion', 'hiding'],
    isAlert: false,

    loadTesters: () => {
        const { group_id }: EventsSlice = get();

        get_testers(group_id, (testers: Tester[]) => {
            //alert(objectToJson(liders))
            set({ exam: 'speed', testers });
        })
    },

    selectExam: (selected: NumericFields<Tester>) => {
        const { exam}: TestingSlice = get();

        set((state: TestingSlice) => ({
            exam: selected === state.exam ? '' : selected,
        }))
    },

    selectTesterExam: (student_id: number) => set({ isAlert: true }),

    setIsAlert: (isAlert: boolean) => set({ isAlert }),

    updateTesterExam: (student_id: number) => {

    }
});
