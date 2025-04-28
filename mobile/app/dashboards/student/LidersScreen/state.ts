import { Store } from "../store";
import { Group, Lider } from "../model";
import { get_groups, get_liders} from '../http';
import { NumericFields } from '../../../shared/utils';


export interface LidersSlice {
    groups: Group[];
    liders: Lider[];
    lider_test: NumericFields<Lider>;
    lider_tests: NumericFields<Lider>[];

    loadGroups: (camp_id: number) => void;
    loadLiders: (group_id: number) => void;

    selectTest: (test: NumericFields<Lider>) => void;
}

export const createLidersSlice = (set: any, get: () => Store): LidersSlice => ({
    groups: [{id: 0, name: 'Group 1', description: 'description'}, {id: 0, name: 'Group 2', description: 'description'}],
    liders: [{ photo: '', first_name: 'first', last_name: 'last',
        speed: 5.1, stamina: 5.1, climbing: 5.1, evasion: 5.1, hiding: 5.1,
        achieves: [{image: 'medal', level: 'common'}, {image: 'medal', level: 'common'}]
    }],
    lider_test: 'speed',       
    lider_tests: ['speed', 'stamina', 'climbing', 'evasion', 'hiding'],

    loadGroups: (camp_id: number) => {
        get_groups(camp_id, (groups: Group[]) => {
            set({ groups });
        })
    },

    loadLiders: (group_id: number) => {
        get_liders(group_id, (liders: Lider[]) => {
            set({ lider_test: 'speed', liders: liders.sort((a, b) => a.speed - b.speed) });
        })
    },

    selectTest: (test: NumericFields<Lider>) => set((state: LidersSlice) => ({
        lider_test: test,
        liders: [...state.liders].sort((a, b) => a[test] - b[test])
    })),
});
