import { Coach } from '../model';
import { update_coach } from '../http';


export interface CoachesSlice {
    coaches: Coach[];

    coach_id: number;

    setCoaches: (coaches: Coach[]) => void;
    updateCoach: (coach_id: number, data: Partial<Coach>) => void; 
}

export const createCoachesSlice = (set: any, get: any): CoachesSlice => ({
    coaches: [],
    coach_id: 0,

    setCoaches: (coaches: Coach[]) => set({coaches}),

    updateCoach: (coach_id: number, data: Partial<Coach>) => {
        //alert(objectToJson(data))
        update_coach(coach_id, data, (res => {
            if (res.isOk) {
                //alert('Updated')
            }
        }));
    },
});