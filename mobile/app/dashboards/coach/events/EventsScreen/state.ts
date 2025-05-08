import { Event } from "../model";
import { get_groups } from '../../students/http';
import { get_coach_last_event, get_coach_events } from '../http';
import { objectToJson, getYearAndMonth, getCurrentYear, getDayAndWeekday } from "../../../../shared/utils";
import { Group } from "../../students/model";


export interface EventsSlice {
    groups: Group[];
    group_ids: number[];

    days: {day: number, weekday: string}[];
    events: Event[];
    event_id: number;

    event_year: number;
    event_month: number;
    event_week: number;

    loadGroups: (coach_id: number) => void;
    loadLastEvent:(group_ids: number[]) => void;
    loadEvents: (group_ids: number[], year: number, month: number, week: number) => void;

    selectDate: (year: number, month: number, week: number ) => void;
    selectEvent: (event_id: number) => void;
}

export const createEventsSlice = (set: any, get: any): EventsSlice => ({     
    groups: [],
    group_ids: [],

    days: [],
    events: [],
    event_id: 0,

    event_year: getCurrentYear(),
    event_month: 3,
    event_week: 0,

    loadGroups: (coach_id: number) => {
        get_groups(coach_id, (groups: Group[]) => {
            set({ groups });
            if (groups.length > 0) {
                const group_ids: number[] = groups.map(el => el.id);
                set({group_ids});

                const { loadLastEvent }: EventsSlice = get();
                loadLastEvent(group_ids);
            }
        })
    },

    loadLastEvent:(group_ids: number[]) => {
        get_coach_last_event(group_ids, (res => {
            if (res.isEvents) {
                
                const { loadEvents }: EventsSlice = get();
                loadEvents(group_ids, res.year, res.month, res.week);
            }
        }));
    },

    loadEvents: (group_ids: number[], year: number, month: number, week: number) => {
        get_coach_events(year, month, week, group_ids, (events: Event[]) => {
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
                events: events.map(el => ({...el, day: getDayAndWeekday(el.timestamp).day})),
                event_id: eventId,
                event_year: year,
                event_month: month,
                event_week: week
            });
            let currentDay: number = 0;
            let days: {day: number, weekday: string}[]=[];

            for (let event of events) {
                const {day, weekday} = getDayAndWeekday(event.timestamp)

                if (day !== currentDay) {
                    days.push({day, weekday});
                }
            }
            set({days})
        })
    },

    selectDate: (year: number, month: number, week: number ) => {
        set({ event_year: year, event_month: month, event_week: week });

        const { loadEvents, group_ids }: EventsSlice = get();
        loadEvents(group_ids, year, month, week);
    },

    selectEvent: (event_id: number) => {
        set({ event_id });
    },
});
