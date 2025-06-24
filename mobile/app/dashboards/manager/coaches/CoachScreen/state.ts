import { Coach, CoachGroup, FreeGroup } from '../model';
import { get_coach, update_coach, get_coache_groups, remove_coach_group, get_free_groups, add_coach_group } from '../http';
import { objectToJson } from '../../../../shared/utils';
import { CoachesSlice } from '../CoachesScreen/state';


export interface CoachSlice {
    coach: Coach;
    field: string;

    isSignature: boolean;
    signature: string | null;
    
    freeGroups: FreeGroup[];
    coachGroups: CoachGroup[];

    coach_group_id: number;
    isDeleteAlert: boolean;
    isFreeGroups: boolean;

    loadCoach: (coach_id: number) => void;
    loadCoachGroups: (coach_id: number) => void;
    loadFreeGroups: () => void;
    closeFreeGroups: () => void;

    updateCoach: (field: string, data: Partial<Coach>) => void;

    toggleSignature: () => void;
    saveSignature: (signature: string | null) => void;

    selectGroup: (coach_group_id: number) => void;
    addGroup: (group_id: number) => void;

    showDeleteAlert:() => void;
    hideDeleteAlert:() => void;
    removeGroup: () => void;
}

export const createCoachSlice = (set: any, get: any): CoachSlice => ({
    coach: {
        first_name: 'First',
        last_name: 'Second',
        phone: '',
        email: '',
        active: true,
        signature: undefined,
        camp_id: 0
    },
    field: 'signature',
    
    isSignature: false,
    signature: null,

    coachGroups: [],
    freeGroups: [],

    coach_group_id: 0,
    isDeleteAlert: false,
    isFreeGroups: false,

    loadCoach: (coach_id: number) => {
        get_coach(coach_id, (coach => {
            set({ coach, signature: "data:image/png;base64," + coach.signature });

            const {loadCoachGroups}: CoachSlice = get();
            loadCoachGroups(coach_id);
        }));
    },

    loadCoachGroups: (coach_id: number) => {
        get_coache_groups(coach_id, (coachGroups => {
            set({ coachGroups });
        }));
    },

    loadFreeGroups: () => {
        set({isFreeGroups: true});

        get_free_groups((freeGroups) => {
            set({ freeGroups });
        })
    },

    closeFreeGroups: () => set({isFreeGroups: false}),

    updateCoach: (field: string, data: Partial<Coach>) => {
        const {coach_id}: CoachesSlice = get();

        update_coach(coach_id, data, (res => {
            if (res.isOk) {
                //alert('Updated')
                // set({field: });
            }
        }));
    },

    toggleSignature: () => set((state: CoachSlice) => ({isSignature: !state.isSignature})),

    saveSignature: (signature: string | null) => {
         if (signature) {
            const base64Data = signature.replace(/^data:image\/png;base64,/, '');
            const data: Partial<Coach> = {signature: base64Data};
            const { updateCoach }: CoachSlice = get();

            updateCoach('signature', data);
            set({signature});
         }
    },

    selectGroup: (coach_group_id: number) => set((state: CoachSlice) => ({
        coach_group_id: state.coach_group_id === coach_group_id ? 0 : coach_group_id
    })),

    addGroup: (group_id: number) => {
        const { coach_id }: CoachesSlice = get();
        const data = { coache_id: coach_id, group_id };

        add_coach_group(data, (coachGroups => {
            set({ coachGroups, isFreeGroups: false });
        }));
    },

    showDeleteAlert:() => set({isDeleteAlert: true}),
    hideDeleteAlert:() => set({isDeleteAlert: false}),

    removeGroup: () => {
        set({ isDeleteAlert: false });
        const {coach_group_id}: CoachSlice = get();
        
        remove_coach_group(coach_group_id, (res) => {
            if (res.isOk) {
                set((state: CoachSlice) => ({
                    coach_group_id: 0,
                    coachGroups: state.coachGroups.filter(el => el.id !== coach_group_id)
                }));
            }
        });
    },
});
