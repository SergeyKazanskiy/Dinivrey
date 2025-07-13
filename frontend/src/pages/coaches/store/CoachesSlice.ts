import { Coach } from '../model';
import { create_coach, update_coach, delete_coach } from '../http';
import { objectToJson } from '../../../shared/utils';


export interface CoachesSlice {
    coaches: Coach[];
    coachId: number;

    setCoaches: (coaches: Coach[]) => void;
    selectCoach: (coach_id: number) => void;

    addCoach: (camp_id: number) => void;
    updateCoach: (coach_id: number, data: Partial<Coach>) => void; 
    deleteCoach: (coach_id: number) => void;
}

export const createCoachesSlice = (set: any, get: any): CoachesSlice => ({
    coaches: [],
    coachId: 0,

    setCoaches: (coaches: Coach[]) => {
        //alert(objectToJson(coaches))
        set({ coaches })},
    selectCoach: (coach_id: number) => set({ coachId: coach_id }),

    addCoach: (camp_id: number) => {
        set({isAddAlert: false});
        const data: Omit<Coach, 'id'> = { camp_id, photo: '', first_name: '', last_name: '',
            phone: '', email: '', active: true, signature: ''}

        create_coach(data, (res => {
            if (res) {
                const newCoach: Coach = {...data, id: res.id};
                set((state: CoachesSlice) => ({ coaches: [...state.coaches, newCoach] }));
            }
        }));
    },

    updateCoach: (coach_id: number, data: Partial<Coach>) => {
        update_coach(coach_id, data, (res => {
            if (res.isOk) {
                set((state: CoachesSlice) => ({
                    coaches: state.coaches.map(el => el.id === coach_id ? {...el, ...data} : el ),
                }));
            }
        }));
    },

    deleteCoach: (coach_id: number) => {
        delete_coach(coach_id, (res => {
            if (res.isOk) {
                set((state: CoachesSlice) => ({
                    coachId: 0,
                    coaches: state.coaches.filter(el => el.id !== coach_id),
                }));
            }
        }));
    },
});