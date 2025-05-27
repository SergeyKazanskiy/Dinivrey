import { Event } from "../model";
import { get_coach_schedule, add_event } from '../http';
import { getTimestampForSchedule, getWeekHourMinute, objectToJson } from "../../../../shared/utils";
import { HistorySlice } from '../HistoryScreen/state';
import { weekDays } from '../../../../shared/constants';


export interface EventsSlice {
    events_shedules: Event[];
    schedule_days: {day: number, weekday: string}[];
    
    event_id: number;
    group_id: number;

    event_timestamp: number;
    event_type: string;
    
    isEventAddAlert: boolean;

    loadSchedules: () => void;
    openAddAlert: (group_id: number, timestamp: number) => void; //select planingEvent
    closeAddAlert: () => void;

    addEvent: (type: string) => void;
    selectEvent: ( event_id: number, group_id: number, timestamp: number) => void;
}

export const createEventsSlice = (set: any, get: any): EventsSlice => ({
    schedule_days: [],  
    events_shedules: [],

    event_id: 0,
    group_id: 0,

    event_timestamp: 0,
    event_type:'',

    isEventAddAlert: false,

    loadSchedules: () => {
        const { group_ids, groups }: HistorySlice = get();

        get_coach_schedule(group_ids, (res => {
            //alert(objectToJson(res))
            if (res) {
                let currentDay: number = 0;
                let days: {day: number, weekday: string}[]=[];
                let events_shedules: Event[] = [];
                
                for (let s of res.schedules) {
                    const day = s.weekday;
                    const weekday = weekDays[day - 1];

                    if (s.weekday !== currentDay) {
                        days.push({day, weekday});
                        currentDay = day;
                    }
                    const existingEvent = getExistingEvent(res.events, s.weekday, s.hour, s.minute)
                    if (existingEvent) {
                        if (!checkContentEvents(events_shedules, existingEvent.id)) {
                            events_shedules.push(existingEvent);
                        }
                    } else {
                        const group = groups.find(el => el.id === s.group_id)!
                        const planingEvent: Event = {
                            id: 0,
                            camp_id: group.camp_id,
                            timestamp: getTimestampForSchedule(s.weekday, s.hour, s.minute),
                            type: 'Training',
                            day,
                            desc: 'Planning event',
                            group1_id: s.group_id,
                            group2_id: 0
                        }
                        events_shedules.push(planingEvent);
                    }
                }
                const sortedDays = days.sort((a, b) => a.day - b.day);
                const sortedEvents = events_shedules.sort((a, b) => a.timestamp - b.timestamp);
                set({schedule_days: sortedDays, events_shedules: sortedEvents});
            }
        }));
    },

    openAddAlert: (group_id: number, group_timestamp: number) => {
        set({group_id, group_timestamp, isEventAddAlert: true});
    },

    closeAddAlert: () => set({isEventAddAlert: false}),

    addEvent: (type: string) => {
        const { events_shedules, group_id, event_timestamp, groups }: EventsSlice & HistorySlice= get();
        const planingEvent = events_shedules.find(el => el.group1_id === group_id && el.timestamp === event_timestamp);
        //alert(group_id + '   ' + event_timestamp)
        if (planingEvent) {
            const {timestamp, desc, group1_id, group2_id } = planingEvent
            const group = groups.find(el => el.id === group1_id)!
            const event: Omit<Event, 'id'> = { camp_id: group.camp_id, type, timestamp, desc, group1_id, group2_id }
    
            add_event(event, (res => {   
                if (res) {
                    planingEvent.id = res.id;
                    planingEvent.type = type;
                    set((state: EventsSlice) => ({
                        events_shedules: state.events_shedules.map((el) =>
                           el.group1_id === group_id && el.timestamp === event_timestamp ? planingEvent : el),
                        isEventAddAlert: false
                    }));
                    set((state: EventsSlice) => ({
                        events_shedules: state.events_shedules.filter( el =>
                            !(el.id === 0 && el.timestamp === event_timestamp)),
                    }));
                }
            }));
        } else {
            alert('Error find planingEvent')
        } 
    },

    selectEvent: ( event_id: number, group_id: number, timestamp: number) => {
        const { events_shedules }: EventsSlice & HistorySlice= get()
        const event = events_shedules.find(el => el.id === event_id)!;

        set({ event_id, group_id, event_timestamp: timestamp, event_type: event.type});
    },
    //updateEvent: (type: string) => {
        // const { events_shedules,  }: EventsSlice = get();
        // const existingEvent = events_shedules[events_shedules_inx];

        // update_event(existingEvent.id, {type}, (res => {
        //     if (res) {
        //         existingEvent.type = type;
        //     }
        // }));
    //},
});


function getExistingEvent(events: Event[], w: number, h: number, m: number): Event | null {
   
    for (let event of events) {
        const { dayOfWeek, hours, minutes } = getWeekHourMinute(event.timestamp);
        //alert('111  ' + w  + ',  ' + h  + ',  ' + m)
       // alert('222  ' + dayOfWeek  + ',  ' + hours  + ',  ' + minutes)
        if ( dayOfWeek === w &&  hours === h && minutes === m) {
            event.day = getWeekHourMinute(event.timestamp).dayOfWeek;
            return event;
        }
    }
    return null
}

function checkContentEvents(events: Event[], id: number): boolean {
    for (let event of events) {
        if (event.id === id) return true;
    }
    return false
}