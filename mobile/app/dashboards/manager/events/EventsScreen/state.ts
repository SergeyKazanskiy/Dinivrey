import { Event, GroupEvent, Group } from "../model";
import { get_week_events, get_group_events } from '../http';
import { objectToJson, getDayAndWeekday, getWeekNumber } from "../../../../shared/utils";
import { CampsSlice } from "../CampsScreen/state";
import { eventTypes } from '../../../../shared/constants';


export interface EventsSlice {
    groups: Group[];
    days: {day: number, weekday: string}[];
    events: Event[];

    week: number;

    isWeekFilter: boolean;
    group_inx: number;
    group_events: GroupEvent[];

    isGame: boolean;
    isTest: boolean;
    isTraning: boolean;
    types: string[];

    togleFilter: () => void;
    selectWeek: (week: number ) => void;
    selectGroup: (group_inx: number) => void;

    loadWeekEvents: (camp_id: number, year: number, month: number, week: number) => void;
    loadGroupEvents: (group_id: number, year: number, month: number) => void;

    setIsGame: () => void;
    setIsTest: () => void;
    setIsTraning: () => void;
}

export const createEventsSlice = (set: any, get: any): EventsSlice => ({     
    groups: [],
    days: [],
    events: [],

    week: 0,

    isWeekFilter: true,
    group_events: [
        //{id: 0, type: "Training", timestamp: 0, desc: "sfsdfsdf, saffsaf", amound: 5}
    ],
    group_inx: -1,

    isGame: true,
    isTest: true,
    isTraning: true,
    types: eventTypes,


    togleFilter: () => set((state: EventsSlice) => ({ isWeekFilter: !state.isWeekFilter })),

    selectWeek: (week: number ) => {
        set({ week }); 

        const { isWeekFilter, group_inx, groups, year, month, camp_id }: EventsSlice & CampsSlice = get();
        const { loadWeekEvents, loadGroupEvents}: EventsSlice = get();
        loadWeekEvents( camp_id, year, month, week );
    },

    selectGroup: (group_inx: number) => {
        const {year, month, groups, loadGroupEvents}: EventsSlice & CampsSlice= get();
        const group: Group = groups[group_inx];
        set({group_inx});
        loadGroupEvents(group.id, year, month);
    },

    loadWeekEvents: ( camp_id: number, year: number, month: number, week: number) => {
        get_week_events(camp_id, year, month, week, (events: Event[]) => {
            set({
                events: events.map(el => ({...el, day: getDayAndWeekday(el.timestamp).day})),
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

    loadGroupEvents: (group_id: number, year: number, month: number) => {
        get_group_events(group_id, year, month, (events: GroupEvent[]) => {
            set({
                group_events: events.map(el => ({...el, day: getDayAndWeekday(el.timestamp).day})),
                event_year: year,
                event_month: month,
                group_id
            });
        });
    },

    setIsGame: () => {
        // const { isGame, camp_id, group_id, types, filterEvents }: FiltersSlice & EventsSlice = get();
        // const updatedTypes: string[] = isGame ? types.filter((el) => el !== eventTypes[0]) : [...types, eventTypes[0]];
        // const filters: Filters = { types: updatedTypes, camp: camp_id, group: group_id };
        // filterEvents(filters);
        // set((prevState: FiltersSlice) => ({ isGame: !prevState.isGame, types: updatedTypes }));
    },
    setIsTest: () => {
        // const { isTest, camp_id, group_id, types, filterEvents }: FiltersSlice & EventsSlice = get();
        // const updatedTypes: string[] = isTest ? types.filter((el) => el !== eventTypes[1]) : [...types, eventTypes[1]];
        // const filters: Filters = { types: updatedTypes, camp: camp_id, group: group_id };
        // filterEvents(filters);
        // set((prevState: FiltersSlice) => ({ isTest: !prevState.isTest, types: updatedTypes }));
    },
    setIsTraning: () => {
        // const { isTraning, camp_id, group_id, types, filterEvents }: FiltersSlice & EventsSlice = get();
        // const updatedTypes: string[] = isTraning ? types.filter((el) => el !== eventTypes[2]) : [...types, eventTypes[2]];
        // const filters: Filters = { types: updatedTypes, camp: camp_id, group: group_id };
        // filterEvents(filters);
        // set((prevState: FiltersSlice) => ({ isTraning: !prevState.isTraning, types: updatedTypes }));
    },
});
