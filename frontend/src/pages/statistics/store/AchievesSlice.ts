import { GroupAchieve, Honored } from '../model';
import { StateSlice } from '../state';


export interface AchievesSlice {
    groupsAchieves: GroupAchieve[];
    honores: Honored[];

    camp_id2: number;
    achieve_id: number;
    groupAchieve_id: number;


    setGroupAchieves:(groupAchieves: GroupAchieve[]) => void;
    setHonores:( honores: Honored[]) => void;

    selectAchieve: (camp_id: number, achieve_id: number) => void;
    selectGroupAchieve:(group_id: number) => void;
}

export const createAchievesSlice = (set: any, get: any): AchievesSlice => ({
    groupsAchieves: [],
    honores: [],
    
    camp_id2: 0,
    achieve_id: 0,
    groupAchieve_id: 0,


    setGroupAchieves:(groupAchieves: GroupAchieve[]) => set({groupAchieves}),
    setHonores:( honores: Honored[]) => set({honores}),

    selectAchieve: (camp_id: number, achieveId: number) => {
        const { camp_id2, achieve_id }: AchievesSlice = get();

        if (achieveId !== 0 && camp_id !== camp_id2 && achieveId !== achieve_id) {
            set({ camp_id2: camp_id, achieve_id: achieveId, groupsAchieves: [], honores: [] });

            const { loadGroupsAchieveCount }: StateSlice = get();
            loadGroupsAchieveCount(camp_id, achieveId);
        }
    },

    selectGroupAchieve:(group_id: number) => {
        set({ groupsAchieve_id: group_id });

        const { loadHonores, achieve_id }: StateSlice & AchievesSlice = get();
        loadHonores(group_id, achieve_id)
    },
});

