import { CampsSlice } from './store/CampsSlice';
import { CoachesSlice } from './store/CoachesSlice';
import { GroupsSlice } from './store/GroupsSlice';
import { SchedulesSlice } from './store/SchedulesSlice';
import { EventsSlice } from './store/EventsSlice';
import { get_camps, get_camp_coaches, get_coaches_groups, get_schedules, get_last_event, get_competitions } from './http';
import { objectToJson, getCurrentYear } from '../../shared/utils';


export interface StateSlice {
    isSchedule: boolean;
    year: number;
    month: number;

    loadCamps: () => void;
    loadCoaches: (camp_id: number) => void;
    loadGroups: (camp_id: number) => void;

    loadSchedules: (camp_id: number) => void;
    loadLastEvent: (camp_id: number) => void;
    loadEvents: (camp_id: number, year: number, month: number) => void;

    showSchedules:() => void;
    showEvents:() => void;
    selectDate: (year: number, month: number) => void;
}

export const createStateSlice = (set: any, get: any): StateSlice => ({
    isSchedule: true,
    year: getCurrentYear(),
    month: 3,

    loadCamps: () => {
        get_camps((camps => {
            const { setCamps, selectCamp }: CampsSlice = get();
            
            if (camps.length > 0) {
                setCamps(camps);
                selectCamp(camps[0].id, 0);
            }
        }));
    },

    loadCoaches: (camp_id: number) => { 
        get_camp_coaches(camp_id, (coaches => {
            //alert(objectToJson(coaches))
            const { setCoaches }: CoachesSlice = get();
            setCoaches(coaches);
        }));
    },

    loadGroups: (camp_id: number) => {
        get_coaches_groups(camp_id, (groups => {
            //alert(objectToJson(groups))
            const { setCoachGroups }: GroupsSlice = get();
            setCoachGroups(groups);
        }));
    },

    loadSchedules: (camp_id: number) => {
        get_schedules(camp_id, (schedules => {
            const { setSchedules }: SchedulesSlice = get();
            setSchedules(schedules);
        }));
    },

    loadLastEvent: (camp_id: number) => {
        get_last_event(camp_id, (res => {
            if (res.isEvents) {
                const { selectDate }: StateSlice = get();
                
                selectDate(res.year, res.month);
            }
        }));
    },

    loadEvents: (camp_id: number, year: number, month: number) => {
        get_competitions(camp_id, year, month, (events => {
            const { setEvents }: EventsSlice = get();
            setEvents(events);
        }));
    },

    showSchedules:() => set({isSchedule: true}),
    showEvents:() => set({isSchedule: false}),

    selectDate: (year: number, month: number ) => {
        set({ year, month }); 

        const { camp_id, loadEvents }: StateSlice & CampsSlice = get();
        loadEvents(camp_id, year, month);
    },
});
