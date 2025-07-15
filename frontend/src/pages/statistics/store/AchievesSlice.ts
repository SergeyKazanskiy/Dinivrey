import { objectToJson } from '../../../shared/utils';
import { GroupAchieve, Honored } from '../model';
import { StateSlice } from '../state';


export interface AchievesSlice {
    groupsAchieves: GroupAchieve[];
    honores: Honored[];

    camp_id2: number;
    achieve_id: number;
    groupAchieve_id: number;

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

        const { camp_id2, achieve_id }: AchievesSlice = get();
        
        if (campId === camp_id2 && achieveId === achieve_id) {
            set({ camp_id2: 0, achieve_id: 0});
        } else {
            set({ camp_id2: campId, achieve_id: achieveId});

            const { loadGroupsAchieveCount }: StateSlice = get();
            loadGroupsAchieveCount(campId, achieveId);
        }
    },

    selectGroupAchieve: (groupAchieveId: number) => {
        const { groupAchieve_id }: AchievesSlice = get();

        if (groupAchieveId === groupAchieve_id) {
            set({ groupAchieve_id: 0, honores: [] });
        } else {
            set({ groupAchieve_id: groupAchieveId});

            const { loadHonores, achieve_id }: StateSlice & AchievesSlice = get();
            loadHonores(groupAchieveId, achieve_id);
        }
    },
});

