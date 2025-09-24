import { objectToJson, sanitizeName } from '../../../shared/utils';
import { GroupAchieve, Honored } from '../model';
import { StateSlice } from '../state';
import { CampsSlice } from './CampsSlice';


export interface AchievesSlice {
    groupsAchieves: GroupAchieve[];
    honores: Honored[];

    camp_id2: number;
    achieve_id: number;
    groupAchieve_id: number;

    camp_name: string;
    group_name: string;

    clearGroupsAchieves: () => void;

    setGroupAchieves: (groupAchieves: GroupAchieve[]) => void;
    setHonores:( honores: Honored[]) => void;

    selectAchieve: (campId: number, achieveId: number) => void;
    selectGroupAchieve: (groupAchieve_id: number) => void;
}

export const createAchievesSlice = (set: any, get: any): AchievesSlice => ({
    groupsAchieves: [],
    honores: [],
    
    camp_id2: 0,
    achieve_id: 0,
    groupAchieve_id: 0,

    camp_name: '',
    group_name: '',

    clearGroupsAchieves: () => set({ camp_id2: 0, achieve_id: 0,
            groupsAchieves: [], groupAchieve_id: 0,
            honores: [],
    }),


    setGroupAchieves: (groupsAchieves: GroupAchieve[]) => {
        //alert(objectToJson(groupsAchieves))
        set({groupsAchieves})
    },

    setHonores: (honores: Honored[]) => set({honores}),


    selectAchieve: (campId: number, achieveId: number) => {
        if (achieveId === 0) return //???
        
        set({ groupsAchieves: [], groupAchieve_id: 0, honores: []});

        const { camp_id2, achieve_id, camps }: AchievesSlice & CampsSlice = get();
        
        if (campId === camp_id2 && achieveId === achieve_id) {
            set({ camp_id2: 0, achieve_id: 0});
        } else {
            const camp = camps.find(el => el.id === campId)!
            set({ camp_id2: campId, achieve_id: achieveId, camp_name: sanitizeName(camp.name)});

            const { loadGroupsAchieveCount }: StateSlice = get();
            loadGroupsAchieveCount(campId, achieveId);
        }
    },

    selectGroupAchieve: (groupAchieveId: number) => {
        const { groupAchieve_id, groupsAchieves }: AchievesSlice = get();

        if (groupAchieveId === groupAchieve_id) {
            set({ groupAchieve_id: 0, honores: [] });
        } else {
            const group = groupsAchieves.find(el => el.group_id === groupAchieveId)!
            set({ groupAchieve_id: groupAchieveId, group_name: sanitizeName(group.group_name) });

            const { loadHonores, achieve_id }: StateSlice & AchievesSlice = get();
            loadHonores(groupAchieveId, achieve_id);
        }

        // const { camp_name, group_name }: AchievesSlice = get();
        // alert(camp_name + " " + group_name)
    },
});

