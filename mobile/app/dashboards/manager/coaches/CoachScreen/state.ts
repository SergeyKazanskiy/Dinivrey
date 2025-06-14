import { Coach } from '../model';
import { get_coach, update_coach } from '../http';
import { objectToJson } from '../../../../shared/utils';
import { CoachesSlice } from '../CoachesScreen/state';


export interface CoachSlice {
    coach: Coach;
    signature: string | null;
    field: string;

    loadCoach: (coach_id: number) => void;
    updateCoache: (field: string, data: Partial<Coach>) => void;
    setSignature: (signature: string | null) => void;
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
    signature: null,
    field: 'signature',
    

    loadCoach: (coach_id: number) => {
        get_coach(coach_id, (coach => {
            set({coach});
        }));
    },

    updateCoache: (field: string, data: Partial<Coach>) => {
        const {coach_id}: CoachesSlice = get();

            update_coach(coach_id, data, (res => {
                if (res.isOk) {
                    //alert('Updated')
                    // set({field: });
                }
            }));
    },

    setSignature: (signature: string | null) => {
         if (signature) {
            const base64Data = signature.replace(/^data:image\/png;base64,/, '');
            const data: Partial<Coach> = {signature: base64Data};
            const { updateCoache }: CoachSlice = get();

            updateCoache('signature', data);
            set({signature});
         }
    },
});
