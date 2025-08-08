import { Camp } from '../model';
import { StateSlice } from '../state';
import { EventsSlice } from './EventsSlice';
import { sanitizeName } from '../../../shared/utils';


export interface CampsSlice {
    camps: Camp[];
    camp_id: number;
    camp_inx: number;
    camp_name: string;

    setCamps: (camps: Camp[]) => void;
    selectCamp: (id: number, camp_inx: number) => void;
}

export const createCampsSlice = (set: any, get: any): CampsSlice => ({
    camps: [],
    camp_id: 0,
    camp_inx: -1,
    camp_name: '',

    setCamps: (camps: Camp[])  => {
        set({ camps, camp_id: 0, camp_inx: -1 });

        if (camps.length > 0) {
            const { selectCamp }: CampsSlice = get();

            selectCamp(camps[0].id, 0);
        }
    },

    selectCamp: (id: number, camp_inx: number) => {
        const { camp_id, camps }: CampsSlice = get();
        if (id !== camp_id) {
            set({
                camp_id: id,
                camp_inx,
                camp_name: sanitizeName(camps[camp_inx].name),
             });

            const { isSchedule }: StateSlice = get();
            const { loadCoaches, loadGroups, loadSchedules, loadLastEvent, loadManagers }: StateSlice = get();
            const { setEvents }: EventsSlice = get();

            loadCoaches(id);
            loadGroups(id);
            loadManagers(id);
            
            if (isSchedule) {
                loadSchedules(id);
            } else {
                setEvents([]);
                loadLastEvent(id);
            }  
        } 
    },
});