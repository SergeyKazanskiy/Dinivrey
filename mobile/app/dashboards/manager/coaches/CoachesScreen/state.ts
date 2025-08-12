import { Coach, CoachShort, Camp } from '../model';
import { get_camps, get_coaches, create_coach, delete_coach  } from '../http';
import { objectToJson } from '../../../../shared/utils';
import { sanitizeName } from '../../../../shared/utils';


export interface CoachesSlice {
    camps: Camp[],
    coaches: CoachShort[];

    campId: number;
    camp_inx: number;
    camp_name: string;

    coach_id: number;
    
    isAddAlert: boolean;
    isDeleteAlert: boolean;

    loadCamps: () => void;
    loadCoaches: (camp_id: number) => void;

    selectCamp: (camp_id: number, camp_inx: number) => void;
    selectCoach: (coach_id: number) => void;

    showAddAlert: () => void;
    hideAddAlert: () => void;

    showDeleteAlert: () => void;
    hideDeleteAlert: () => void;

    addCoach: (camp_id: number, first_name: string, last_name: string) => void;
    deleteCoach: (coach_id: number) => void;
}

export const createCoachesSlice = (set: any, get: any): CoachesSlice => ({
    camps: [],
    coaches: [],

    campId: 0,
    camp_inx: 0,
    camp_name: '',
    
    coach_id: 0,

    isAddAlert: false,
    isDeleteAlert: false,


    loadCamps: () => {
        get_camps((camps: Camp[]) => {
            set({ camps });
            if (camps.length > 0) {
            const camp_id = camps[0].id;
            const { selectCamp }: CoachesSlice = get();

            set({camp_id});
            selectCamp(camp_id, 0);
            }
        })
    },

    loadCoaches: (camp_id: number) => { 
        get_coaches(camp_id, (coaches => {
            set({coaches});
        }));
    },

    selectCamp: (camp_id: number, camp_inx: number) => {
        const { camps, campId, loadCoaches }: CoachesSlice = get();

        if (campId !== camp_id) {
            set({
                campId: camp_id, camp_inx,
                camp_name: sanitizeName(camps[camp_inx].name),
            });
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
        const data: Coach = { camp_id, photo: '', first_name, last_name, phone: '', email: '', active: true, signature: ''}

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
