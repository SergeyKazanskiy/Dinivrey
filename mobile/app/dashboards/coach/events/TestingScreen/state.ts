import { Store } from "../store";
import { Tester, Test } from "../model";
import { get_testers, update_student_test } from '../http';
import { NumericFields, objectToJson } from '../../../../shared/utils';
import { EventsSlice } from '../EventsScreen/state';


export interface TestingSlice {
    testers: Tester[];
    testerName: string;

    exams: NumericFields<Tester>[];
    exam: NumericFields<Tester>;

    isAlert: boolean;
    tester_id: number;
    examValue: number;

    loadTesters: () => void;
    selectExam: (test: NumericFields<Tester>) => void;

    onTesterClick: (student_id: number) => void;
    setIsAlert: (isAlert: boolean) => void;
    setExamValue: (examValue: number) => void;

    updateTest: (examValue: number) => void;
}

export const createTestingSlice = (set: any, get: () => Store): TestingSlice => ({
    testers: [],
    testerName:'',

    exam: 'speed',       
    exams: ['speed', 'stamina', 'climbing', 'evasion', 'hiding'],

    isAlert: false,
    tester_id: 0,
    examValue: 0,


    loadTesters: () => {
        const { event_id, group_id }: EventsSlice = get();

        get_testers(event_id, group_id, (testers: Tester[]) => {
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

    onTesterClick: (tester_id: number) => {
        const { testers }: TestingSlice = get();
        const tester = testers.find(el => el.id === tester_id)!;
        set({
            isAlert: true,
            testerName: tester.first_name + ' ' + tester.last_name,
            tester_id
        })
    },

    setIsAlert: (isAlert: boolean) => set({ isAlert }),

    setExamValue: (examValue: number) => {
        set({ examValue, isAlert: false });
    },


    updateTest: (examValue: number, ) => {
        const { exam, tester_id, testers }: TestingSlice= get();
        const data = {exam: examValue};
        const tester = testers.find(el => el.id === tester_id)!;

        update_student_test(tester.test_id, data, (res => {
            if (res.isOk) {
                tester[exam] = examValue;

                set((state: TestingSlice) => ({
                    testers: state.testers.map(el => el.id === tester_id ? tester : el),
                }))
            }
        }));
    },
});
