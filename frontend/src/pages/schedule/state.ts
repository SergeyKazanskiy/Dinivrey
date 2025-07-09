import { CampsSlice } from './store/CampsSlice';
import { ScheduleSlice } from './store/ScheduleSlice';
import { get_camps, get_camp_schedule } from './http';
import { Schedule, Camp } from './model';
import { objectToJson } from '../../shared/utils';


export interface StateSlice {
    loadCamps: () => void;
    loadSchedules: (camp_id: number) => void;
}

export const createStateSlice = (set: any, get: any): StateSlice => ({

    loadCamps: () => {
        get_camps((camps: Camp[]) => {
            const { setCamps, selectCamp }: CampsSlice = get();
            
            if (camps.length > 0) {
                setCamps(camps);
                selectCamp(camps[0].id, 0);
            }
        })
    },

    loadSchedules: (camp_id: number) => {
        get_camp_schedule(camp_id, (schedules: Schedule[]) => {
            //alert(objectToJson(schedules))
            const { setSchedules }: ScheduleSlice = get();
            setSchedules(schedules);
        })
    },
});
