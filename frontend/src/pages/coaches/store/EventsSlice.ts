import {  Event } from '../model';
//import { Store } from '../store';


export interface EventsSlice {
    month: string;
    events: Event[];
    
    addEvent: () => void;
    removeEvent: (inx: number) => void;
    setMonth: (month: string) => void;
}

export const createEventsSlice = (set: any): EventsSlice => ({
    month: "February",
  
    events: [
        { name: "Event and place", date: "Fri, 02 Jul" },
        { name: "Event and place", date: "Fri, 04 Jul" },
        { name: "Event and place", date: "Fri, 08 Jul" },
    ],

    setMonth: (month) => set({ month }),
    
    addEvent: () => set((state: any) => ({
        events: [],
    })),

    removeEvent: (inx: number) => set((state: any) => ({
        events: [],
    })),
});