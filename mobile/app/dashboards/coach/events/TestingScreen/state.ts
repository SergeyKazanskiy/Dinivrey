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
    updateTesterExam: (student_id: number) => void;
}

export const createTestingSlice = (set: any, get: () => Store): TestingSlice => ({
    testers: [],
    exam: 'speed',       
    exams: ['speed', 'stamina', 'climbing', 'evasion', 'hiding'],

    loadTesters: () => {
        const { group_id }: EventsSlice = get();

        get_testers(group_id, (testers: Tester[]) => {
            //alert(objectToJson(liders))
            set({
                exam: 'speed',
                testers: testers.sort((a, b) => b.speed - a.speed)
            });
        })
    },

    selectExam: (selected: NumericFields<Tester>) => {
        const { exam}: TestingSlice = get();

        set((state: TestingSlice) => ({
            exam: selected === state.exam ? '' : selected,
        }))
    },

    updateTesterExam: (student_id: number) => {

    }
});
