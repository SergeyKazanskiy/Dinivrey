import { create } from 'zustand';
import { ProfileSlice, createProfileSlice } from './store/ProfileSlice';
import { GroupsSlice, createGroupsSlice } from './store/GroupsSlice';
import { EventsSlice, createEventsSlice } from './store/EventsSlice';


export type Store = ProfileSlice & GroupsSlice & EventsSlice;

export const useStore = create<Store>((set, get) => ({
    ...createProfileSlice(set),
    ...createGroupsSlice(set),
    ...createEventsSlice(set),
}));