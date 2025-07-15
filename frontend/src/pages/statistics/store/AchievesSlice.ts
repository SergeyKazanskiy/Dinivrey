import { objectToJson } from '../../../shared/utils';
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

    selectAchieve: (campId: number, achieveId: number) => void;
    selectGroupAchieve:(groupAchieve_id: number) => void;
}

export const createAchievesSlice = (set: any, get: any): AchievesSlice => ({
    groupsAchieves: [],
    honores: [],
    
    camp_id2: 0,
    achieve_id: 0,
    groupAchieve_id: 0,


    setGroupAchieves:(groupsAchieves: GroupAchieve[]) => {
        //alert(objectToJson(groupsAchieves))
        set({groupsAchieves})
    },

    setHonores:( honores: Honored[]) => set({honores}),


    selectAchieve: (campId: number, achieveId: number) => {
        const { camp_id2, achieve_id }: AchievesSlice = get();

        if (achieveId === 0 || campId === camp_id2 && achieveId === achieve_id) return

        set({ camp_id2: campId, achieve_id: achieveId,
            groupsAchieves: [], groupAchieve_id: 0,
            honores: [],
        });

        const { loadGroupsAchieveCount }: StateSlice = get();
        loadGroupsAchieveCount(campId, achieveId);
    },

    selectGroupAchieve:(groupAchieve_id: number) => {
        set({ groupAchieve_id});

        const { loadHonores, achieve_id }: StateSlice & AchievesSlice = get();
        loadHonores(groupAchieve_id, achieve_id)
    },
});

