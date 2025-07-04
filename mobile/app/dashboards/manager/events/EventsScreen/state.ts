import { Event, CoachShort, Group, Schedule, Filters } from "../model";
import { get_camp_groups, get_camp_events, get_camp_schedule, get_all_coaches } from '../http';
import { change_group_schedule_coach, add_event, update_event, delete_event } from '../http';
import { objectToJson, getChanges, isToday } from "../../../../shared/utils";
import { CampsSlice } from "../CampsScreen/state";
import { eventTypes, weekDays } from '../../../../shared/constants';
import { EventSlice } from '../EventScreen/state';


export interface EventsSlice {
    days: {day: number, weekday: string}[];
    groups: Group[];
    
    coaches: CoachShort[];
    schedules: Schedule[];
    events: Event[];

    filtredSchedules: Schedule[];
    filtredEvents: Event[];

    group_inx: number;
    group_id: number;
    event_id: number;
    schedule_id: number;
    attendance_group_id: number;

    isSchedulesView: boolean;
    isCoachesView: boolean;
    isAttendanceReport: boolean;

    isAddAlert: boolean;
    isEditAlert: boolean;
    isDeleteAlert: boolean;
    isAddingErrorAlert: boolean;

    isGame: boolean;
    isTest: boolean;
    isTraning: boolean;
    types: string[];

    today: number; //currentTimestamp

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
    hideAddingErrorAlert: () => void;

    showEditAlert: () => void;
    hideEditAlert: () => void;

    showDeleteAlert: () => void;
    hideDeleteAlert: () => void;

    showAttendanceReport: (event_id: number, attendance_group_id: number) => void;
    hideAttendanceReport: () => void;

    showCoachesView: (id: number) => void; // load all coaches
    hideCoachesView: () => void;
    selectNewCoach: (coach_id: number) => void;

    selectEvent: (event_id: number) => void;
    addEvent: (event: Omit<Event, "id">) => void;
    updateEvent: (event: Event) => void;
    deleteEvent: (event_id: number) => void;

    setToday: (today: number) => void;
}

export const createEventsSlice = (set: any, get: any): EventsSlice => ({     
    days: [],
    coaches: [],
    schedules: [],
    events: [],
    groups: [],
    
    filtredSchedules: [],
    filtredEvents: [],

    group_inx: -1,
    group_id: 0,
    event_id: 0,
    schedule_id: 0,
    attendance_group_id: 0,

    isSchedulesView: true,
    isCoachesView: false,
    isAttendanceReport: false,

    isAddAlert: false,
    isEditAlert: false,
    isDeleteAlert: false,
    isAddingErrorAlert: false,

    isGame: true,
    isTest: true,
    isTraning: true,
    types: eventTypes,

    today: 0,

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
            //alert(objectToJson(schedules))
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

    showAddAlert: () => set({isAddAlert: true, isEditAlert: false}),
    hideAddAlert: () => set({isAddAlert: false}),
    hideAddingErrorAlert: () => set({isAddingErrorAlert: false}),

    showEditAlert: () => set({isEditAlert: true}),
    hideEditAlert: () => set({isEditAlert: false}),

    showDeleteAlert: () => set({isDeleteAlert: true, isEditAlert: false}),
    hideDeleteAlert: () => set({isDeleteAlert: false}),

    showAttendanceReport: (event_id: number,attendance_group_id: number) => set({
        isAttendanceReport: true, event_id, attendance_group_id}),
    hideAttendanceReport: () => set({isAttendanceReport: false, event_id: 0}),

    showCoachesView: (id: number) => {
        get_all_coaches((coaches => {
            set({coaches, schedule_id: id});
        }));

        set({isCoachesView: true})
    },
    hideCoachesView: () => set({isCoachesView: false}),

    selectNewCoach: (coach_id: number) => {
        set({isCoachesView: false});
        const { schedule_id }: EventsSlice = get();

        change_group_schedule_coach(schedule_id, {coach_id}, (res => {
            if (res.isOk) {
                const { coaches, camp_id, filterShedules }: EventsSlice & CampsSlice = get();

                const coach: CoachShort = coaches.find(el => el.id === coach_id)!
                let coach_name = coach.first_name + ' ' + coach.last_name;
                coach_name = camp_id === coach.camp_id ? coach_name : coach_name + ' (' + coach.camp_name + ')';
                
                set((state: EventsSlice) => ({
                    schedules: state.schedules.map(el => el.id === schedule_id ? {...el, coach_name} : el)
                }));

                filterShedules(0);
            }
        }));
    },

    // Events
    selectEvent: (event_id: number) => set((state: EventsSlice) => ({
        event_id: state.event_id === event_id ? 0 : event_id
    })),


    addEvent: (newEvent: Omit<Event, 'id'>) => {
        const today = new Date();
        if (newEvent.timestamp < today.getTime()) {
            set({isAddingErrorAlert: true});
            return;
        }

        set({isAddAlert: false});
        
        add_event(newEvent, (res) => {
            if (res.id) {
                const event: Event = {...newEvent, id: res.id};
                const { events }: EventsSlice  = get();

                const eventsWithNew = [ ...events, event];
                const sortedEvents = eventsWithNew.sort((a, b) => a.timestamp - b.timestamp);
                set({ events: sortedEvents, event_id: res.id });
        
                const { types, group_id, filterEvents }: EventsSlice = get();
                const filters: Filters = { types: types, group: group_id };
                filterEvents(filters);
            }     
        })
    },

    updateEvent: (updatedEvent: Event) => {
        set({isAddAlert: false});

        const { events, event_id }: EventsSlice = get();
        const event = events.find(event => event.id === event_id)!
        const data = getChanges(event, updatedEvent);
  
        update_event(event_id, data, (res) => {
            if (res.isOk) {
                const updatedEvents = events.map((el) => el.id === event_id ? updatedEvent : el);
                set({ events: updatedEvents.sort((a, b) => a.timestamp - b.timestamp) });
 
                const { types, group_id, filterEvents }: EventsSlice   = get();
                const filters: Filters = { types: types, group: group_id };
                filterEvents(filters);
            }
        });
        // const { closeModal }: StateSlice = get();
        // closeModal();
    },

    deleteEvent: (event_id: number) => {
        set({isDeleteAlert: false, event_id: 0});

        delete_event(event_id, (res => {
            if (res.isOk) {
                set((state: EventsSlice) => ({
                    events: state.events.filter(el => el.id !== event_id),
                }));

                const { types, group_id, filterEvents }: EventsSlice  = get();
                const filters: Filters = { types: types, group: group_id };
                filterEvents(filters);
            }
        }));
    },

    setToday: (today: number) => set({today}),
});


function filterEvents(events: Event[], filters: Filters): Event[] {
    return events.filter(el => (
        filters.types.includes(el.type) &&
        (filters.group === 0 || el.group1_id === filters.group || el.group2_id === filters.group)
    ));
}

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