import { create } from 'zustand';
import { StateSlice, createStateSlice } from './state';

import { CampsSlice, createCampsSlice } from './store/CampsSlice';
import { TestsSlice, createTestsSlice } from './store/TestsSlice';
import { GamesSlice, createGamesSlice } from './store/GamesSlice';
import { AchievesSlice, createAchievesSlice } from './store/AchievesSlice';
import { LidersSlice, createLidersSlice } from './store/LidersSlice';
// import { EventsSlice, createEventsSlice } from './store/EventsSlice';


export type Store = StateSlice & CampsSlice & TestsSlice & GamesSlice & AchievesSlice & LidersSlice;
    //EventsSlice &  & AttendanceSlice 

export const useStore = create<Store>((set, get) => ({
    ...createStateSlice(set, get),

    ...createCampsSlice(set, get),
    ...createTestsSlice(set, get),
    ...createGamesSlice(set, get),
    ...createAchievesSlice(set, get),
    ...createLidersSlice(set, get),
}));