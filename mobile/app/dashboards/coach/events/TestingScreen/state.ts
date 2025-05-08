import { Store } from "../store";
// import { Group, Lider } from "../model";
// import { get_groups, get_liders} from '../http';
import { NumericFields, objectToJson } from '../../../../shared/utils';
//import { ProfileSlice } from '../ProfileScreen/state';


export interface TestingSlice {
    // groups: Group[];
    // liders: Lider[];
    // lider_test: NumericFields<Lider>;
    // lider_tests: NumericFields<Lider>[];

    // loadGroups: (camp_id: number) => void;
    // loadLiders: () => void;

    // selectTest: (test: NumericFields<Lider>) => void;
}

export const createTestingSlice = (set: any, get: () => Store): TestingSlice => ({
    // groups: [{id: 0, name: 'Group 1', description: 'description'}, {id: 0, name: 'Group 2', description: 'description'}],
    // liders: [],
    // lider_test: 'speed',       
    // lider_tests: ['speed', 'stamina', 'climbing', 'evasion', 'hiding'],

    // loadGroups: (camp_id: number) => {
    //     get_groups(camp_id, (groups: Group[]) => {
    //         set({ groups });
    //     })
    // },

    // loadLiders: () => {
    //     const { student }: ProfileSlice = get();

    //     get_liders(student.group_id, (liders: Lider[]) => {
    //         //alert(objectToJson(liders))
    //         set({
    //             lider_test: 'speed',
    //             liders: liders.sort((a, b) => b.speed - a.speed)
    //         });
    //     })
    // },

    // selectTest: (test: NumericFields<Lider>) => {
    //     const { liders, lider_test}: TestingSlice = get();
    //     var sorted: Lider[];
    //     if (test === lider_test) {
    //         sorted = liders.sort((a, b) => {
    //             const avgA = a.speed + a.stamina + a.climbing + a.evasion + a.hiding;
    //             const avgB = b.speed + b.stamina + b.climbing + b.evasion + b.hiding;
    //             return avgB - avgA;
    //         });
    //     } else {
    //         sorted = liders.sort((a, b) => b[test] - a[test]);
    //     }
    //     set((state: TestingSlice) => ({
    //         lider_test: test === state.lider_test ? '' : test,
    //         liders: sorted
    //     }))
    // },
});
