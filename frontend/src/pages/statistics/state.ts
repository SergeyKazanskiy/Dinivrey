import { objectToJson } from '../../shared/utils';
import { get_camps, get_groups, get_camp_groups_tests, get_camp_liders} from './http';
import { get_groups_achieve_count, get_groups_honores, get_camp_last_test} from './http';
import { Camp, Group, GroupTest, Lider, GroupAchieve, Honored } from './model';
import { CampsSlice } from './store/CampsSlice';
import { LidersSlice } from './store/LidersSlice';
import { TestsSlice } from './store/TestsSlice';
import { AchievesSlice } from './store/AchievesSlice';


export interface StateSlice {
    isStatictics: boolean;
    isTests: boolean;

    selectStatistics: () => void;
    selectAchievements: () => void;

    loadCamps: () => void;
    loadLastDate: (camp_id: number) => void;
    loadGroups: (camp_id: number) => void;

    loadTests: (camp_id: number, year: number, month: number) => void;
    loadLiders: (camp_id: number, exam: string) => void;

    loadGroupsAchieveCount: (camp_id: number, achieve_id: number) => void;
    loadHonores: (group_id: number, achieve_id: number) => void;
}

export const createStateSlice = (set: any, get: any): StateSlice => ({
    isStatictics: true,
    isTests: false,


    selectStatistics: () => set({isStatictics: true}),
    selectAchievements: () => set({isStatictics: false}),

    loadCamps: () => {
        get_camps((camps: Camp[]) => {
            //alert(objectToJson(camps))
            if (camps.length > 0) {
                const { setCamps }: CampsSlice = get();
                setCamps(camps);
            }
        });
    },

    loadLastDate: (camp_id: number) => {
        get_camp_last_test(camp_id, (res => {
            set({ isTests: res.isTests });
  
            if (res.isTests) {

                const { selectDate }: TestsSlice = get();
                selectDate(res.year, res.month);
            }
        }));
    },

    loadGroups: (camp_id: number) => {
        get_groups(camp_id, (groups: Group[]) => {
            if (groups.length > 0) {
                const { setGroups }: TestsSlice = get();
                setGroups(groups);
            }
        });
    },

    loadTests: (camp_id: number, year: number, month: number) => {
        get_camp_groups_tests(camp_id, year, month, (tests: GroupTest[]) => {
            //alert(objectToJson(camps))
            if (tests.length > 0) {
                const { setTests }: TestsSlice = get();
                setTests(tests);
            }
        });
    },

    loadLiders: (camp_id: number, exam: string) => {
        get_camp_liders(camp_id, exam, (liders: Lider[]) => {
            //alert(objectToJson(liders))
            if (liders.length > 0) {
                const { setLiders }: LidersSlice = get();
                setLiders(liders);
            }
        });
    },

    loadGroupsAchieveCount: (camp_id: number, achieve_id: number) => {
        get_groups_achieve_count(camp_id, achieve_id, (groupAchieves: GroupAchieve[]) => {
            //alert(objectToJson(groupAchieves))
            if (groupAchieves.length > 0) {
                const { setGroupAchieves }: AchievesSlice = get();
                setGroupAchieves(groupAchieves);
            }
        });
    },

    loadHonores: (group_id: number, achieve_id: number) => {
        get_groups_honores(group_id, achieve_id, (honores: Honored[]) => {
            //alert(objectToJson(liders))
            if (honores.length > 0) {
                const { setHonores }: AchievesSlice = get();
                setHonores(honores);
            }
        });
    }
});