import { create } from 'zustand';
import { StateSlice, createStateSlice } from './state';

import { CampsSlice, createCampsSlice } from './store/CampsSlice';
import { CoachesSlice, createCoachesSlice } from './store/CoachesSlice';
import { GroupsSlice, createGroupsSlice } from './store/GroupsSlice';
import { SchedulesSlice, createSchedulesSlice } from './store/SchedulesSlice';
import { EventsSlice, createEventsSlice } from './store/EventsSlice';


export type Store = StateSlice & CampsSlice & CoachesSlice & GroupsSlice & SchedulesSlice & EventsSlice;

export const useStore = create<Store>((set, get) => ({
    ...createStateSlice(set, get),

    ...createCampsSlice(set, get),
    ...createCoachesSlice(set, get),
    ...createGroupsSlice(set, get),
    ...createSchedulesSlice(set, get),
    ...createEventsSlice(set, get),
}));