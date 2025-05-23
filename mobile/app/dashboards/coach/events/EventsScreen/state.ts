import { Schedule } from "../model";
import { get_groups } from '../../students/http';
import { get_coach_schedule } from '../http';
import { objectToJson, getTimestamp, getCurrentYear, getDayAndWeekday, getWeekNumber } from "../../../../shared/utils";
import { ShortGroup } from '../../../../shared/components/CoachEventCell';
import { Group } from "../../students/model";


export interface EventsSlice {
    schedules: Schedule[];
    schedule_id: number;

    days: {day: number, weekday: string}[];

    loadSchedules: () => void;
    selectSchedule: (schedule_id: number) => void;

    addEvent: () => void;
    deleteEvent: () => void;
}

export const createEventsSlice = (set: any, get: any): EventsSlice => ({     
    schedules: [{id: 0, group_id: 0, weekday: 2, hour: 16, minute: 30},
        {id: 2, group_id: 0, weekday: 4, hour: 18, minute: 30}
    ],
    schedule_id: 1,
    days: [],


    loadSchedules: () => {
        
    },

    selectSchedule: (schedule_id: number) => {
        
    },

    addEvent: () => {
        
    },


    deleteEvent: () => {
        
    },
});
