import { create } from 'zustand';
import { StateSlice, createStateSlice } from './state';

import { TestsSlice, createTestsSlice } from './store/TestsSlice';
import { GamesSlice, createGamesSlice } from './store/GamesSlice';
import { AchievesSlice, createAchievesSlice } from './store/AchievesSlice';
// import { AttendanceSlice, createAttendanceSlice } from './store/AttendanceSlice';
// import { EventsSlice, createEventsSlice } from './store/EventsSlice';


export type Store = StateSlice & TestsSlice & GamesSlice & AchievesSlice ;
    //EventsSlice &  & AttendanceSlice 

export const useStore = create<Store>((set, get) => ({
    ...createStateSlice(set, get),

    //...createEventsSlice(set, get),
    ...createTestsSlice(set, get),
    ...createGamesSlice(set, get),
    ...createAchievesSlice(set, get),
    //...createAttendanceSlice(set, get),
}));