import { Event } from '../model';
import { EventsSlice } from '../EventsScreen/state'
import { CampsSlice } from '../CampsScreen/state'


export interface EventSlice {
    timestamp: number;
    type: string;
    desc: string;
    group1_id: number;
    group2_id: number;

    setTimestamp: (timestamp: number) => void;
    setType: (type: string) => void;
    setDesc: (desc: string) => void;
    setGroup1: (group1_id: number) => void;
    setGroup2: (group2_id: number) => void;

    getNewEvent:() => Omit<Event, 'id'>;
    getUpdatedEvent:() => Event;
    clearEvent:() => Event;
}

export const createEventSlice = (set: any, get: any): EventSlice => ({
    timestamp: 0,
    type: 'traning',
    desc: '',
    group1_id: 0,
    group2_id: 0,

    setTimestamp: (timestamp: number) => set({ timestamp }),
    setType: (type: string) => set({ type }),
    setDesc: (desc: string) => set({ desc }),
    setGroup1: (group1_id: number) => set({ group1_id }),
    setGroup2: (group2_id: number) => set({ group2_id }),

    getNewEvent:() => {
        const { camp_id, timestamp, type, desc, group1_id, group2_id }: CampsSlice & EventsSlice & EventSlice = get();
        return { camp_id, timestamp, type, desc, group1_id, group2_id }
    },

    getUpdatedEvent:() => {
        const { event_id, camp_id, timestamp, type, desc, group1_id, group2_id }: CampsSlice & EventsSlice & EventSlice = get();
        return { id: event_id, camp_id, timestamp, type, desc, group1_id, group2_id }
    },

    clearEvent:() => set({ 
        timestamp: 0,
        type: 'traning',
        desc: '',
        group1_id: 0,
        group2_id: 0,
    }),
});
