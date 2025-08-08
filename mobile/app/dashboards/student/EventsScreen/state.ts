import { Event, Schedule } from "../model";
import { get_group_last_event, get_group_events, get_group_schedule } from '../http';
import { ProfileSlice } from '../ProfileScreen/state';
import { objectToJson, getYearAndMonth } from "@/app/shared/utils";


export interface EventsSlice {
    events: Event[];
    event_id: number;

    event_year: number;
    event_month: number;

    isMainEvent: boolean;
    isEventsView: boolean;

    schedules: Schedule[];

    togleEvents: () => void;
    loadLastEvent:() => void;
    selectEventDate: (event_year: number, event_month: number) => void;

    loadEvents: (student_id: number, event_year: number, event_month: number) => void;
    loadEvent: (event_id: number, timestamp: number) => void;

    selectEvent: (event_id: number) => void;
    loadSchedule: (group_id: number) => void;
}

export const createEventsSlice = (set: any, get: any): EventsSlice => ({     
    events: [],
    event_id: 0,

    event_year: 2025,
    event_month: 3,

    isMainEvent: false,
    isEventsView: true,

    schedules: [],

    togleEvents: () => set((state: EventsSlice) => ({
        isEventsView: !state.isEventsView
    })),

    loadLastEvent:() => {
        const { isMainEvent, student }: EventsSlice & ProfileSlice = get();

        if (isMainEvent) {
            const { event_year, event_month }: EventsSlice = get();
            get().loadEvents(student.group_id, event_year, event_month);
        } else {
            get_group_last_event(student.group_id, (res => {
                if (res.isEvents) {
                    
                    const { loadEvents }: EventsSlice = get();
                    loadEvents(student.group_id, res.year, res.month);
                }
            }));
        }
    },

    selectEventDate: (event_year: number, event_month: number) => {
        set({ event_year, event_month });

        const { loadEvents, student }: EventsSlice & ProfileSlice = get();
        loadEvents(student.group_id, event_year, event_month);
    },

    loadEvents: (group_id: number, event_year: number, event_month: number) => {
        get_group_events(group_id, event_year, event_month, (events: Event[]) => {
            const { event_id }: EventsSlice = get();
            var eventId: Number;

            if (event_id > 0) {
                eventId = event_id;
            } else if (events.length > 0) {
                eventId = events[0].id;
            } else {
                eventId = 0;
            }
            set({
                events,
                event_id: eventId,
                event_year,event_month,
                isMainEvent: false
             });
        })
    },

    loadEvent: (event_id: number, timestamp: number ) => {
        const { year, month } = getYearAndMonth(timestamp);
        set({
            event_id,
            isMainEvent: true,
            event_year: year,
            event_month: month
        });
    },

    selectEvent: (event_id: number) => {
        set({ event_id });
    },

    loadSchedule: (group_id: number) => {
        get_group_schedule(group_id, (schedules: Schedule[]) => {
            set({schedules});
        })
    },
});
