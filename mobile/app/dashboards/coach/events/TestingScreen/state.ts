import { Store } from "../store";
import { Tester } from "../model";
import { get_testers} from '../http';
import { NumericFields, objectToJson } from '../../../../shared/utils';
import { EventsSlice } from '../EventsScreen/state';


export interface TestingSlice {
    testers: Tester[];
    testerName: string;

    exams: NumericFields<Tester>[];
    exam: NumericFields<Tester>;

    isAlert: boolean;
    examValue: number;

    loadTesters: () => void;
    selectExam: (test: NumericFields<Tester>) => void;

    onTesterClick: (student_id: number) => void;
    setIsAlert: (isAlert: boolean) => void;
    setExamValue: (examValue: number) => void;
}

export const createTestingSlice = (set: any, get: () => Store): TestingSlice => ({
    testers: [],
    testerName:'',

    exam: 'speed',       
    exams: ['speed', 'stamina', 'climbing', 'evasion', 'hiding'],

    isAlert: false,
    examValue: 0,


    loadTesters: () => {
        const { group_id }: EventsSlice = get();

        get_testers(group_id, (testers: Tester[]) => {
            //alert(objectToJson(liders))
            set({ exam: 'speed', testers });
        })
    },

    selectExam: (selected: NumericFields<Tester>) => {
        const { exam }: TestingSlice = get();

        set((state: TestingSlice) => ({
            exam: selected === state.exam ? '' : selected,
        }))
    },

    onTesterClick: (student_id: number) => {
        const { testers }: TestingSlice = get();
        const tester = testers.find(el => el.id === student_id)!;
        set({ isAlert: true, testerName: tester.first_name + ' ' + tester.last_name })
    },

    setIsAlert: (isAlert: boolean) => set({ isAlert }),

    setExamValue: (examValue: number) => {
        set({ examValue, isAlert: false });
    },
});
