import { Camp } from '../model';
import { StateSlice } from '../state';


export interface CampsSlice {
    camps: Camp[];
    camp_id: number;
    camp_inx: number;

    setCamps: (camps: Camp[]) => void;
    selectCamp: (id: number, camp_inx: number) => void;
}

export const createCampsSlice = (set: any, get: any): CampsSlice => ({
    camps: [],
    camp_id: 1,
    camp_inx: 0,

    setCamps: (camps: Camp[])  => set({ camps, camp_id: 0 }),

    selectCamp: (id: number, camp_inx: number) => {
        const { camp_id }: CampsSlice = get();
        if (id !== camp_id) {
            set({ camp_id: id, camp_inx });

            const { isSchedule }: StateSlice = get();
            const { loadCoaches, loadGroups, loadSchedules, loadLastEvent }: StateSlice = get();

            loadCoaches(id);
            loadGroups(id);
            
            if (isSchedule) {
                loadSchedules(id);
            } else {
                loadLastEvent(id)
            }  
        } 
    },
});