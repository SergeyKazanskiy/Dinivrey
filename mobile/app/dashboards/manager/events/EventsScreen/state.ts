import { Event, GroupEvent, Group, Schedule, Filters, FormatedEvent } from "../model";
import { get_camp_groups, get_camp_events, get_camp_schedule } from '../http';
import { objectToJson, getDayAndWeekday, getWeekNumber, formatDateTime } from "../../../../shared/utils";
import { CampsSlice } from "../CampsScreen/state";
import { eventTypes, weekDays } from '../../../../shared/constants';
import { EventSlice } from '../EventScreen/state';


export interface EventsSlice {
    days: {day: number, weekday: string}[];
    groups: Group[];
    
    schedules: Schedule[];
    events: Event[];

    filtredSchedules: Schedule[];
    filtredEvents: Event[];

    group_inx: number;
    group_id: number;
    event_id: number;

    isSchedulesView: boolean;
    isAddAlert: boolean;

    isGame: boolean;
    isTest: boolean;
    isTraning: boolean;
    types: string[];

    group1_inx: number;
    group2_inx: number;

    loadGroups: (camp_id: number, callback: () => void) => void;
    loadShedules: (camp_id: number) => void;
    loadEvents: (camp_id: number, year: number, month: number) => void;

    togleFilter: () => void;

    selectGroup: (group_inx: number) => void;
    clearGroup: () => void;

    filterShedules: (group_id: number) => void;
    filterEvents: (filters: Filters) => void;

    setIsGame: () => void;
    setIsTest: () => void;
    setIsTraning: () => void;

    showAddAlert: () => void;
    hideAddAlert: () => void;

    selectEventGroup1: (group_inx: number) => void;
    selectEventGroup2: (group_inx: number) => void;
}

export const createEventsSlice = (set: any, get: any): EventsSlice => ({     
    days: [],
    schedules: [],
    events: [],
    groups: [],
    
    filtredSchedules: [],
    filtredEvents: [],

    group_inx: -1,
    group_id: 0,
    event_id: 0,

    isSchedulesView: true,
    isAddAlert: true,

    isGame: true,
    isTest: true,
    isTraning: true,
    types: eventTypes,

    group1_inx: 0,
    group2_inx: 0,


    loadGroups: (camp_id: number, callback: () => void) => {
        get_camp_groups(camp_id, (groups: Group[]) => {
            set({ groups });
            if (groups.length > 0) {
                callback();
            }
        })
    },

    loadShedules: (camp_id: number) => {
        get_camp_schedule(camp_id, (schedules: Schedule[]) => {
            const { group_id, filterShedules }: EventsSlice = get();

            set({ schedules });
            filterShedules(group_id);
        })
    },

    loadEvents: (camp_id: number, year: number, month: number) => {
        get_camp_events(camp_id, year, month, (events: Event[]) => {
            const { filterEvents, types, group_id }: EventsSlice = get();
            set({events});
            
            const filters: Filters = { types, group: group_id };
            filterEvents(filters);

            if (events.length === 0) {
                const { clearEvent }: EventSlice = get();
                clearEvent();
            }
        });
    },

    togleFilter: () => {
        set((state: EventsSlice) => ({ isSchedulesView: !state.isSchedulesView }));
        const { camp_id, year, month, isSchedulesView, loadShedules, loadEvents }: EventsSlice & CampsSlice= get();

        if (isSchedulesView) {
          loadShedules(camp_id)
        } else {
          loadEvents(camp_id, year, month)
        }
    },

    selectGroup: (group_inx: number) => {
        const { groups, isSchedulesView, types }: EventsSlice & CampsSlice= get();
        const { filterEvents, filterShedules }: EventsSlice = get();

        const group: Group = groups[group_inx];
        set({ group_inx, group_id: group.id });
        
        if (isSchedulesView) {
            filterShedules(group.id);
        } else {
            const filters: Filters = { types, group:  group.id };
            filterEvents(filters)
        }
    },

    clearGroup: () => {
        const { camp_id, isSchedulesView, types }: EventsSlice & CampsSlice= get();
        const { filterEvents, filterShedules }: EventsSlice = get();

        set({ group_inx: -1, group_id:0 });

        if (isSchedulesView) {
            filterShedules(0);
        } else {
            const filters: Filters = { types, group: 0 };
            filterEvents(filters)
        }
    },

    filterShedules: (group_id: number) => {
        const { schedules }: EventsSlice = get();
        const filtredSchedules = group_id !== 0 ? schedules.filter(el => el.group_id === group_id) : schedules;

        set({ filtredSchedules, days: getScheduleDays(filtredSchedules)});
    },

    filterEvents: (filters: Filters) => {
        const { groups, events }: EventsSlice = get();
        const filtredEvents = filterEvents(events, filters);
       // const formatedEvents = formatEvents(filtredEvents, groups);
        set({ filtredEvents });
    },

    setIsGame: () => {
        const { isGame, camp_id, group_id, types, filterEvents }: CampsSlice & EventsSlice = get();
        const updatedTypes: string[] = isGame ? types.filter((el) => el !== eventTypes[0]) : [...types, eventTypes[0]];
        const filters: Filters = { types: updatedTypes, group: group_id };
        filterEvents(filters);
        set((prevState: EventsSlice) => ({ isGame: !prevState.isGame, types: updatedTypes }));
    },
    setIsTest: () => {
        const { isTest, camp_id, group_id, types, filterEvents }: CampsSlice & EventsSlice = get();
        const updatedTypes: string[] = isTest ? types.filter((el) => el !== eventTypes[1]) : [...types, eventTypes[1]];
        const filters: Filters = { types: updatedTypes, group: group_id };
        filterEvents(filters);
        set((prevState: EventsSlice) => ({ isTest: !prevState.isTest, types: updatedTypes }));
    },
    setIsTraning: () => {
        const { isTraning, camp_id, group_id, types, filterEvents }: CampsSlice & EventsSlice = get();
        const updatedTypes: string[] = isTraning ? types.filter((el) => el !== eventTypes[2]) : [...types, eventTypes[2]];
        const filters: Filters = { types: updatedTypes, group: group_id };
        filterEvents(filters);
        set((prevState: EventsSlice) => ({ isTraning: !prevState.isTraning, types: updatedTypes }));
    },

    showAddAlert: () => set({isAddAlert: true}),
    hideAddAlert: () => set({isAddAlert: false}),

    selectEventGroup1: (group_inx: number) => {},
    selectEventGroup2: (group_inx: number) => {},
});


function filterEvents(events: Event[], filters: Filters): Event[] {
    //alert(objectToJson(events))
    return events.filter(el => (
        filters.types.includes(el.type) &&
        (filters.group === 0 || el.group1_id === filters.group || el.group2_id === filters.group)
    ));
}

// function formatEvents(events: Event[], groups: Group[]): FormatedEvent[] {
//     return events.map((event) => {
//         return formatEvent(event, groups);
//     });
// };

// function formatEvent({id, timestamp, type, desc, group1_id, group2_id }: Event, groups: Group[]): FormatedEvent {
//     return {
//         id,
//         date: formatDateTime(timestamp).date, 
//         time: formatDateTime(timestamp).time,
//         type,
//         desc,
//         group1: groups.find(group => group.id === group1_id)?.name || (group1_id === 0 ? '' : ''+group1_id),
//         group2: groups.find(group => group.id === group2_id)?.name || (group2_id === 0 ? '' : ''+group2_id)
//     };
// };

function getScheduleDays(schedules: Schedule[]): {day: number, weekday: string}[] {
    let currentDay: number = 0;
    let days: {day: number, weekday: string}[]=[];

    for (let schedule of schedules) {
        const day = schedule.weekday;

        if (schedule.weekday !== currentDay) {
            days.push({day, weekday: weekDays[day - 1]});
            currentDay = day;
        }
    }
    return days
};