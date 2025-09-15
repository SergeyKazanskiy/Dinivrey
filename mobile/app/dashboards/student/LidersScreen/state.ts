import { Store } from "../store";
import { Group, Lider, Test, Camp } from "../model";
import { get_groups, get_liders, get_camps} from '../http';
import { NumericFields, objectToJson, sanitizeName } from '../../../shared/utils';
import { ProfileSlice } from '../ProfileScreen/state';


export interface LidersSlice {
    camps: Camp[];
    groups: Group[];
    
    camp_id: number;
    camp_inx: number;
    group_id: number;
    group_inx: number;

    loaded_group_name: string;

    liders: Lider[];
    currentExam: string;
    query: string;
    
    loadCamps: () => void;
    loadGroups: (camp_id: number) => void;
    loadLiders: (group_id: number, group_name: string) => void;

    selectCamp: (campId: number, camp_inx: number) => void;
    selectGroup: (group_id: number, group_inx: number) => void;

    setQuery: (query: string) => void;
    selectTest: (exam: NumericFields<Lider>) => void;
}

export const createLidersSlice = (set: any, get: () => Store): LidersSlice => ({
    camps: [],
    groups: [{id: 0, name: 'Group 1', description: 'description'}, {id: 0, name: 'Group 2', description: 'description'}],
    
    camp_id: 0,
    camp_inx: -1,
    group_id: 0,
    group_inx: -1,

    loaded_group_name: '',

    liders: [],
    currentExam: 'speed',       
    query: '',

    loadCamps: () => {
        get_camps((camps: Camp[]) => {
            set({ camps });
            if (camps.length > 0) {
                const camp_id = camps[0].id;
                const { selectCamp }: LidersSlice = get();
        
                set({camp_id});
                selectCamp(camp_id, 0);
            }
        })
    },

    loadGroups: (camp_id: number) => {
        get_groups(camp_id, (groups: Group[]) => {
            set({ groups });
        })
    },

    loadLiders: (group_id: number, group_name: string) => {
        //alert('kkk ' + group_name)
        get_liders(group_id, (liders: Lider[]) => {
            set({
                loaded_group_name: group_name,
                lider_test: 'speed', //???
                liders: liders.sort((a, b) => b.speed - a.speed)
            });
        })
    },

    selectCamp: (campId: number, camp_inx: number) => {
        set({ camp_id: campId, camp_inx });

        const { loadGroups }: LidersSlice = get();
        loadGroups(campId);
    },
    
    selectGroup: (group_id: number, group_inx: number) => {
        set({ group_id, group_inx });

        const { loadLiders, groups }: LidersSlice = get();
        const group_name = groups[group_inx].name
        loadLiders(group_id, group_name);
    },

    setQuery: (query: string) => set({ query }),

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
