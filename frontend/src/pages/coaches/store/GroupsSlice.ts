import { CoachGroup } from '../model';
import { add_coach_group, remove_coach_group } from '../http';


export interface GroupsSlice {
    coachGroups: CoachGroup[];
    coach_group_id: number;

    setCoachGroups: (coachGroups: CoachGroup[]) => void;
    selectCoachGroup: (coach_group_id: number) => void;

    addCoachGroup: (coach_id: number, group_id: number) => void;
    removeCoachGroup: (coach_group_id: number) => void;
}

export const createGroupsSlice = (set: any, get: any): GroupsSlice => ({
    coachGroups: [],
    coach_group_id: 0,

    setCoachGroups: (coachGroups: CoachGroup[]) => set({ coachGroups }),
    selectCoachGroup: (coach_group_id: number) =>  set({ coach_group_id }),

    addCoachGroup: (coach_id: number, group_id: number) => {
        const data = { coache_id: coach_id, group_id };

        add_coach_group(data, (coachGroups => {
            set({ coachGroups });
        }));
    },

    removeCoachGroup: (coach_group_id: number) => {
        remove_coach_group(coach_group_id, (res) => {
            if (res.isOk) {
                set((state: GroupsSlice) => ({
                    coach_group_id: 0,
                    coachGroups: state.coachGroups.filter(el => el.id !== coach_group_id)
                }));
            }
        });
    },
});