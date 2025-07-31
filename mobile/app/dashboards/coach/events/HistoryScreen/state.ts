import { Event, GroupEvent } from "../model";
import { get_groups } from '../../students/http';
import { get_coach_last_event, get_coach_events, get_group_events } from '../http';
import { objectToJson, getTodayTimestamp, getCurrentYear, getDayAndWeekday, getWeekNumber } from "../../../../shared/utils";
import { Group } from '../../students/model';


export interface HistorySlice {
    groups: Group[];
    group_ids: number[];

    days: {day: number, weekday: string}[];
    events: Event[];

    event_year: number;
    event_month: number;
    event_week: number;

    isWeekFilter: boolean;
    group_inx: number;
    group_events: GroupEvent[];

    loadGroups: (coach_id: number, callback: () => void) => void;
    loadLastEvent:(group_ids: number[]) => void;
    loadEvents: (group_ids: number[], year: number, month: number, week: number) => void;

    selectDate: (year: number, month: number, week: number ) => void;
    togleFilter: () => void;

    selectGroup: (group_inx: number) => void;
    loadGroupEvents: (group_id: number, year: number, month: number) => void;
}

export const createHistorySlice = (set: any, get: any): HistorySlice => ({     
    groups: [],
    group_ids: [],

    days: [],
    events: [],

    event_year: getCurrentYear(),
    event_month: 3,
    event_week: 0,

    isWeekFilter: true,
    group_events: [
        //{id: 0, type: "Training", timestamp: 0, desc: "sfsdfsdf, saffsaf", amound: 5}
    ],
    group_inx: -1,

    loadGroups: (coach_id: number, callback: () => void) => {
        get_groups(coach_id, (groups: Group[]) => {
           // alert(objectToJson(groups))
            set({ groups });
            if (groups.length > 0) {
                const group_ids: number[] = groups.map(el => el.id);
                set({group_ids});

                const { loadLastEvent }: HistorySlice = get();
                loadLastEvent(group_ids);

                callback();
            }
        })
    },

    loadLastEvent:(group_ids: number[]) => {
        get_coach_last_event(group_ids, (res => {
            //alert(objectToJson(res))
            if (res.isEvents) {
                
                const { loadEvents }: HistorySlice = get();
                loadEvents(group_ids, res.year, res.month, res.week);
            }
        }));
    },

    loadEvents: (group_ids: number[], year: number, month: number, week: number) => {
        get_coach_events(year, month, week, group_ids, (events: Event[]) => {
            set({
                events: events.map(el => ({...el, day: getDayAndWeekday(el.timestamp).day})),
                event_year: year,
                event_month: month,
                event_week: week,
            });
            let currentDay: number = 0;
            let days: {day: number, weekday: string}[]=[];

            for (let event of events) {
                const {day, weekday} = getDayAndWeekday(event.timestamp)
            
                if (day !== currentDay) {
                    days.push({day, weekday});
                    currentDay = day;
                }
            }
            set({days})
        })
    },

    selectDate: (year: number, month: number, week: number ) => {
        set({ event_year: year, event_month: month, event_week: week }); //???

        const { loadEvents, loadGroupEvents, group_ids, isWeekFilter, group_inx, groups }: HistorySlice = get();
        if (isWeekFilter) {
            loadEvents(group_ids, year, month, week);
        } else {
            const group_id: number = groups[group_inx].id;
            loadGroupEvents(group_id, year, month);
        }
    },

    togleFilter: () => set((state: HistorySlice) => ({
        isWeekFilter: !state.isWeekFilter,
    })),

    selectGroup: (group_inx: number) => {
        const {event_year, event_month, groups, loadGroupEvents}: HistorySlice = get();
        const group: Group = groups[group_inx];
        set({group_inx});
        loadGroupEvents(group.id, event_year, event_month);
    },

    loadGroupEvents: (group_id: number, year: number, month: number) => {
        get_group_events(group_id, year, month, (events: GroupEvent[]) => {
            set({
                group_events: events.map(el => ({...el, day: getDayAndWeekday(el.timestamp).day})),
                event_year: year,
                event_month: month,
                group_id
            });
        });
    }
});
