import { Store } from "../store";
import { Group, Lider, Test } from "../model";
import { get_groups, get_liders} from '../http';
import { NumericFields, objectToJson } from '../../../shared/utils';
import { ProfileSlice } from '../ProfileScreen/state';


export interface LidersSlice {
    groups: Group[];
    liders: Lider[];
    currentExam: string;
    //lider_tests: NumericFields<Lider>[];

    loadGroups: (camp_id: number) => void;
    loadLiders: () => void;

    selectTest: (test: NumericFields<Lider>) => void;
}

export const createLidersSlice = (set: any, get: () => Store): LidersSlice => ({
    groups: [{id: 0, name: 'Group 1', description: 'description'}, {id: 0, name: 'Group 2', description: 'description'}],
    liders: [],
    currentExam: 'speed',       
    //lider_tests: ['speed', 'stamina', 'climbing', 'evasion', 'hiding'],

    loadGroups: (camp_id: number) => {
        get_groups(camp_id, (groups: Group[]) => {
            set({ groups });
        })
    },

    loadLiders: () => {
        const { student }: ProfileSlice = get();

        get_liders(student.group_id, (liders: Lider[]) => {
            set({
                lider_test: 'speed',
                liders: liders.sort((a, b) => b.speed - a.speed)
            });
        })
    },

    selectTest: (exam: NumericFields<Lider>) => {
        const { liders, currentExam}: LidersSlice = get();
        var sorted: Lider[];
        if (exam === currentExam) {
            sorted = liders.sort((a, b) => {
                const avgA = a.speed + a.stamina + a.climbing + a.evasion + a.hiding;
                const avgB = b.speed + b.stamina + b.climbing + b.evasion + b.hiding;
                return avgB - avgA;
            });
        } else {
            sorted = liders.sort((a, b) => b[exam] - a[exam]);
        }
        set((state: LidersSlice) => ({
            currentExam: exam === state.currentExam ? '' : exam,
            liders: sorted
        }))
    },
});
