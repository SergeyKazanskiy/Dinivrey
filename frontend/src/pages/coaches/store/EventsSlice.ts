import {  Event } from '../model';
import { StateSlice } from '../state';
import { CampsSlice } from './CampsSlice';


export interface EventsSlice {
    events: Event[];

    setEvents: (events: Event[]) => void;
}

export const createEventsSlice = (set: any, get: any): EventsSlice => ({
    events: [],

    setEvents: (events: Event[]) => set({events}),
});