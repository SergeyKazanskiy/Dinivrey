import { Coach, CoachGroup, FreeGroup } from '../model';
import { get_coach, update_coach, add_coach_group } from '../http';
import { get_coache_groups, remove_coach_group, get_free_groups } from '../http';
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
    isFreeGroups: boolean;

    isGroupDeleteAlert: boolean;
    isMakePhotoAlert: boolean;


    loadCoach: (coach_id: number) => void;
    loadCoachGroups: (coach_id: number) => void;
    loadFreeGroups: () => void;
    closeFreeGroups: () => void;

    updateCoach: (data: Partial<Coach>) => void;

    toggleSignature: () => void;
    saveSignature: (signature: string | null) => void;

    selectGroup: (coach_group_id: number) => void;
    addGroup: (group_id: number) => void;
    removeGroup: () => void;

    showGroupDeleteAlert:() => void;
    hideGroupDeleteAlert:() => void;
    
    showMakePhotoAlert:() => void;
    hideMakePhotoAlert:() => void;
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
    isFreeGroups: false,

    isGroupDeleteAlert: false,
    isMakePhotoAlert: false,


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

    updateCoach: (data: Partial<Coach>) => {
        const {coach_id}: CoachesSlice = get();
        //alert(objectToJson(data))
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

            updateCoach(data);
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

    removeGroup: () => {
        set({ isGroupDeleteAlert: false });
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

    showGroupDeleteAlert:() => set({isGroupDeleteAlert: true}),
    hideGroupDeleteAlert:() => set({isGroupDeleteAlert: false}),

    showMakePhotoAlert:() => set({isMakePhotoAlert: true}),
    hideMakePhotoAlert:() => set({isMakePhotoAlert: false}),
});
