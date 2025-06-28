import { Coach, CoachShort } from '../model';
import { get_coaches, create_coach, delete_coach  } from '../http';
import { objectToJson } from '../../../../shared/utils';


export interface CoachesSlice {
    coaches: CoachShort[];

    campId: number;
    coach_id: number;

    isAddAlert: boolean;
    isDeleteAlert: boolean;

    loadCoaches: (camp_id: number) => void;

    selectCamp: (camp_id: number) => void;
    selectCoach: (coach_id: number) => void;

    showAddAlert: () => void;
    hideAddAlert: () => void;

    showDeleteAlert: () => void;
    hideDeleteAlert: () => void;

    addCoach: (camp_id: number, first_name: string, last_name: string) => void;
    deleteCoach: (coach_id: number) => void;
}

export const createCoachesSlice = (set: any, get: any): CoachesSlice => ({
    coaches: [],

    campId: 0,
    coach_id: 0,
    
    isAddAlert: false,
    isDeleteAlert: false,


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

    showAddAlert: () => set({isAddAlert: true}),
    hideAddAlert: () => set({isAddAlert: false}),

    showDeleteAlert: () => set({isDeleteAlert: true}),
    hideDeleteAlert: () => set({isDeleteAlert: false}),

    addCoach: (camp_id: number, first_name: string, last_name: string) => {
        set({isAddAlert: false});
        const data: Coach = { camp_id, first_name, last_name, phone: '', email: '', active: true, signature: ''}

        create_coach(data, (res => {
            if (res) {
                const newCoach: CoachShort = {id: res.id, first_name, last_name };
                set((state: CoachesSlice) => ({ coaches: [...state.coaches, newCoach] }));
            }
        }));
    },

    deleteCoach: (coach_id: number) => {
        delete_coach(coach_id, (res => {
            if (res.isOk) {
                set((state: CoachesSlice) => ({
                    coach_id: 0, isDeleteAlert: false,
                    coaches: state.coaches.filter(el => el.id !== coach_id),
                }));
            }
        }));
    },
});
