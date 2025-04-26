import { Event } from "../model";
import { get_group_events } from '../http';
import { ProfileSlice } from '../ProfileScreen/state';

export interface EventsSlice {
    events: Event[];
    event_id: number;
    event_year: number;
    event_month: number;

    selectDate: (year: number, month: number) => void;
    loadEvents: (student_id: number, year: number, month: number) => void;
    selectEvent: (event_id: number) => void;
}

export const createEventsSlice = (set: any, get: any): EventsSlice => ({     
    events: [],
    event_id: 0,
    event_year: 2025,
    event_month: 3,

    selectDate: (event_year: number, event_month: number) => {
        set({ event_year, event_month });

        const { loadEvents, student }: EventsSlice & ProfileSlice = get();
        loadEvents(student.group_id, event_year, event_month);
    },

    loadEvents: (group_id: number, year: number, month: number) => {
        get_group_events(group_id, year, month, (events: Event[]) => {
            set({ events, event_id: 0 });
        })
    },

    selectEvent: (event_id: number) => {
        set({ event_id });
    },
});
