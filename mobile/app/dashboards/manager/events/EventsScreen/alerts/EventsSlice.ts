import { Event, FormatedEvent, Group, Filters } from '../model';
import { formatDateTime, getChanges } from '../../../shared/utils';
import { StateSlice } from '../state';
import { EventSlice } from './EventSlice';
import { FiltersSlice } from './FiltersSlice';
import { add_event, update_event, delete_event } from '../http';
import { objectToJson } from '../../../../../shared/utils';


export interface EventsSlice {
    events: Event[];
    formatedEvents: FormatedEvent[];

    column: string;
    event_id: number;
    
    setEvents: (events: Event[]) => void;
    filterEvents: (filters: Filters) => void;
    selectCell: (event_id: number, column: string) => void;
    
    addEvent: () => void;
    updateEvent: (isTimestamp?: boolean) => void;
    deleteEvent: () => void;

    updateTimestamp: (timestamp: number) => void;
    updateType: (type: string) => void;
    updateDesc: (desc: string) => void;
    updateGroup1: (group1: number) => void;
    updateGroup2: (group2: number) => void;
}

export const createEventsSlice = (set: any, get: any): EventsSlice => ({
    events: [
        { id: 1, timestamp: 1742724679, type: 'Game', desc: 'Batliaser High School city: Hadera', group1_id: 1, group2_id: 3, camp_id: 1},
        { id: 2, timestamp: 1742724679, type: 'Game', desc: 'Batliaser High School', group1_id: 2, group2_id: 1, camp_id: 1 },
        { id: 3, timestamp: 1742724679, type: 'Game', desc: 'Batliaser High School city', group1_id: 1, group2_id: 0, camp_id: 1 },
    ],
    formatedEvents: [
        { id: 1, date: 'Wed 4', time: '16:30', type: 'Game', desc: 'Batliaser High School city: Hadera', group1: "Group 1", group2: "Group 3" },
        { id: 2, date: 'Wed 10', time: '17:30', type: 'Game', desc: 'Batliaser High School city: Hadera', group1: "Group 2", group2: "Group 1" },
        { id: 3, date: 'Wed 12', time: '14:30', type: 'Game', desc: 'Batliaser High School city: Hadera', group1: "Group 2", group2: ""  },
    ],
    
    column: 'date',
    event_id: 0,

    setEvents: (events: Event[]) => {
        const { groups }: FiltersSlice = get();
        set({
            events,
            formatedEvents: formatEvents(events, groups)
        })
        if (events.length === 0) {
            const { clearEvent }: EventSlice = get();
            clearEvent();
        }
    },
    
    filterEvents: (filters: Filters) => {
        const { groups, events }: EventsSlice & FiltersSlice = get();
        const filtredEvents = filterEvents(events, filters);
        const formatedEvents = formatEvents(filtredEvents, groups);
        set({ formatedEvents: formatedEvents });
    },

    selectCell: (event_id: number, column: string) => {
        
        const { events }: EventsSlice = get();
        const event = events.find(event => event.id === event_id)!
        set({ event_id, column}) //, camp_id: event.camp_id
        const date = new Date(event.timestamp);
        //alert(date.getFullYear()+ ' '+ date.getMonth() + ' ' +date.getDate())
        //alert(isPast(event.timestamp) + ' '+isToday(1744720961) + ' ' +isFuture(event.timestamp))

        const { setTimestamp, setType, setDesc, setGroup1, setGroup2}: EventSlice = get();
        setTimestamp(event.timestamp);
        setType(event.type);
        setDesc(event.desc);
        setGroup1(event.group1_id);
        setGroup2(event.group2_id);

        if (column === 'group1' || column === 'group2' ) {

            
            const { loadAttendances }: StateSlice = get();
            const group_id = column === 'group1' ? event.group1_id : event.group2_id;

            loadAttendances(event_id, group_id);
            set({openedGroupId: group_id})
        }
    },

    addEvent: () => {
        const { getNewEvent }: EventSlice = get();
        const newEvent: Omit<Event, 'id'> = getNewEvent();
        //alert(objectToJson(newEvent));
        add_event(newEvent, (res) => {
            if (res.id) {
                const event: Event = {...newEvent, id: res.id};
                const { events }: EventsSlice  = get();

                const eventsWithNew = [ ...events, event];
                const sortedEvents = eventsWithNew.sort((a, b) => a.timestamp - b.timestamp);
                set({ events: sortedEvents });
        
                const { types, camp_id, group_id, filterEvents }: EventsSlice & FiltersSlice  = get();
                const filters: Filters = { types: types, camp: camp_id, group: group_id };
                filterEvents(filters);
            }     
        })
        const { closeModal }: StateSlice = get();
        closeModal();
    },

    updateEvent: (isTimestamp?: boolean) => {
        const { getUpdatedEvent, events, event_id, column }: EventSlice & EventsSlice = get();
        const updatedEvent: Event = getUpdatedEvent(); 
        const event = events.find(event => event.id === event_id)!
        const data = getChanges(event, updatedEvent);
       // alert(objectToJson(event_id));
        update_event(event_id, data, (res) => {
            if (res.isOk) {
                const updatedEvents = events.map((el) => el.id === event_id ? updatedEvent : el);
                if (isTimestamp) {
                    set({ events: updatedEvents.sort((a, b) => a.timestamp - b.timestamp) });
                } else {
                    set({ events: updatedEvents });
                }

                if (column === 'group1' || column === 'group2' ) {
                    const { loadAttendances }: StateSlice = get();
                    const group_id = column === 'group1' ? updatedEvent.group1_id : updatedEvent.group2_id;
        
                    loadAttendances(event_id, group_id);
                    set({openedGroupId: group_id})
                }    
                const { types, camp_id, group_id, filterEvents }: EventsSlice & FiltersSlice  = get();
                const filters: Filters = { types: types, camp: camp_id, group: group_id };
                filterEvents(filters);
            }
        });
        const { closeModal }: StateSlice = get();
        closeModal();
    },

    deleteEvent: () => {
        const { event_id, closeModal }: EventsSlice & StateSlice = get();
        //alert(event_id)
        delete_event(event_id, (res => {
            if (res.isOk) {
                set((state: EventsSlice) => ({
                    events: state.events.filter(el => el.id !== state.event_id),
                    formatedEvents: state.formatedEvents.filter(el => el.id !== state.event_id),
                    attendances: [],
                    students: []
                }));
            }
        }));

        closeModal();
    },

    updateTimestamp: (timestamp: number) => {
        const { setTimestamp, updateEvent }: EventsSlice & EventSlice = get();
        setTimestamp(timestamp);
        updateEvent(true);
    },

    updateType: (type: string) => {
        const { setType, updateEvent }: EventsSlice & EventSlice = get();
        setType(type);
        updateEvent();
    },

    updateDesc: (desc: string) => {
        const { setDesc, updateEvent }: EventsSlice & EventSlice = get();
        setDesc(desc);
        updateEvent();
    },

    updateGroup1: (group1: number) => {
        const { events, event_id, isAttendanceView, setGroup1, updateEvent }: EventsSlice & EventSlice & StateSlice = get();
        const event = events.find(event => event.id === event_id)!
        //alert(group1 + ', ' + event.group1_id + ', ' + isAttendanceView)
        if (!checkIdenticalGroups(group1, event.group2_id)) {
            setGroup1(group1);
            if (!checkIsList(group1, event.group1_id, isAttendanceView)) {
                updateEvent();
            }
        } 
    },

    updateGroup2: (group2: number) => {
        const { events, event_id, isAttendanceView, setGroup2, updateEvent }: EventsSlice & EventSlice & StateSlice = get();
        const event = events.find(event => event.id === event_id)!

        if (!checkIdenticalGroups(event.group1_id, group2)) {
            setGroup2(group2);
            updateEvent();
        } else if (group2 !== event.group2_id && isAttendanceView) {
            alert('First delete the list with the group')
            return false;
        }
    },
});

function checkIdenticalGroups(group1_id: number, group2_id: number | null) {
    if (group1_id === group2_id) {
        alert ("There can't be two identical groups.");
        return true;
    } else {
        return false;
    } 
}

function checkIsList(newGroup: number, oldGroup: number, isAttendanceView: boolean) {
    if ((newGroup !== oldGroup) && isAttendanceView) {
        alert('First delete the list with the group')
        return true;
    } else {
        return false;
    } 
}

function filterEvents(events: Event[], filters: Filters): Event[] {
    return events.filter(el => (
        filters.types.includes(el.type) &&
        (filters.group === 0 || el.group1_id === filters.group || el.group2_id === filters.group) &&
        el.camp_id === filters.camp
    ));
}

function formatEvents(events: Event[], groups: Group[]): FormatedEvent[] {
    return events.map((event) => {
        return formatEvent(event, groups);
    });
};

function formatEvent({id, timestamp, type, desc, group1_id, group2_id }: Event, groups: Group[]): FormatedEvent {
    return {
        id,
        date: formatDateTime(timestamp).date, 
        time: formatDateTime(timestamp).time,
        type,
        desc,
        group1: groups.find(group => group.id === group1_id)?.name || (group1_id === 0 ? '' : ''+group1_id),
        group2: groups.find(group => group.id === group2_id)?.name || (group2_id === 0 ? '' : ''+group2_id)
    };
};

