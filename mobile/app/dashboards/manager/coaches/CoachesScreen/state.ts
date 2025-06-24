import { Camp, CoachShort } from '../model';
import { get_coaches } from '../http';
import { objectToJson } from '../../../../shared/utils';


export interface CoachesSlice {
    coaches: CoachShort[];

    campId: number;
    coach_id: number;

    loadCoaches: (camp_id: number) => void;

    selectCamp: (camp_id: number) => void;
    selectCoach: (coach_id: number) => void;

    addCoach: () => void;
    deleteCoach: (coach_id: number) => void;
}

export const createCoachesSlice = (set: any, get: any): CoachesSlice => ({
    coaches: [],

    campId: 0,
    coach_id: 0,
    
    loadCoaches: (camp_id: number) => { 
        get_coaches(camp_id, (coaches => {
            set({coaches});
        }));
    },

    selectCamp: (camp_id: number) => {
        const { campId, loadCoaches }: CoachesSlice = get();
        if (campId !== camp_id) {
            set({ campId: camp_id });
            loadCoaches(camp_id);
        } 
    },

    selectCoach: (coach_id: number) => set({coach_id}),

    addCoach: () => {

    },

    deleteCoach: (coach_id: number) => {
        // detach_drill(drill_id, (res => {
        //     if (res.isOk) {
        //         set((state: DrillsSlice) => ({
        //             drills: state.drills.map(el => el.id === drill_id ? {...el, present: false} : el),
        //             eventDrills: state.eventDrills.filter(el => el.id !== drill_id),
        //         }));
        //     }
        // }));
    },
});
