import { Coach } from '../model';
import { create_coach, update_coach, delete_coach, add_coach_photo } from '../http';
import { objectToJson } from '../../../shared/utils';
import { CampsSlice } from './CampsSlice';


export interface CoachesSlice {
    coaches: Coach[];
    coachId: number;

    setCoaches: (coaches: Coach[]) => void;
    selectCoach: (coach_id: number) => void;

    addCoach: (camp_id: number) => void;
    updateCoach: (coach_id: number, data: Partial<Coach>) => void; 
    deleteCoach: (coach_id: number) => void;

    uploadPhoto: (student_id: number, file: File, file_name: string) => void;
}

export const createCoachesSlice = (set: any, get: any): CoachesSlice => ({
    coaches: [],
    coachId: 0,

    setCoaches: (coaches: Coach[]) => {set({ coaches })},

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

    uploadPhoto: (coach_id: number, file: File, file_name: string) => {
        const formData = new FormData();
        formData.append('file', file);

        add_coach_photo(coach_id, formData, (res => {
            if (res.isOk) {
                set((state: CoachesSlice) => ({
                    coaches: state.coaches.map(el => el.id === coach_id ? {...el, photo: file_name} : el ),
                }))
            }
        }));
    },
});