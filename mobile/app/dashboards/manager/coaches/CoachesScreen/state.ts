import { CoachShort } from '../model';
import { get_coaches } from '../http';
import { objectToJson } from '../../../../shared/utils';


export interface CoachesSlice {
    coaches: CoachShort[];
    coach_id: number;

    loadCoaches: () => void;
    selectCoach: (coach_id: number) => void;

    addCoach: () => void;
    deleteCoach: (coach_id: number) => void;
}

export const createCoachesSlice = (set: any, get: any): CoachesSlice => ({
    coaches: [],
    coach_id: 0,
    
    loadCoaches: () => { 
        get_coaches((coaches => {
            set({coaches});
        }));
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
