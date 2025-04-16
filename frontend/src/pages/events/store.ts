import { create } from 'zustand';
import { StateSlice, createStateSlice } from './state';
import { EventSlice, createEventSlice } from './store/EventSlice';
import { EventsSlice, createEventsSlice } from './store/EventsSlice';
import { FiltersSlice, createFiltersSlice } from './store/FiltersSlice';
import { StudentsSlice, createStudentsSlice } from './store/StudentsSlice';


export type Store = StateSlice & EventSlice & EventsSlice & FiltersSlice & StudentsSlice ;

export const useStore = create<Store>((set, get) => ({
    ...createStateSlice(set, get),
    ...createEventSlice(set, get),
    ...createEventsSlice(set, get),
    ...createFiltersSlice(set, get),
    ...createStudentsSlice(set, get),
}));