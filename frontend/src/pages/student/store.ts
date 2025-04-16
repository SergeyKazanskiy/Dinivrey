import { create } from 'zustand';
import { StateSlice, createStateSlice } from './state';

import { ProfileSlice, createProfileSlice } from './store/ProfileSlice';
import { ParentsSlice, createParentsSlice } from './store/ParentsSlice';
import { AddressSlice, createAddressSlice } from './store/AddressSlice';

import { GroupsSlice, createGroupsSlice } from './store/GroupsSlice';
import { AttendanceSlice, createAttendanceSlice } from './store/AttendanceSlice';

import { EventsSlice, createEventsSlice } from './store/EventsSlice';
import { TestsSlice, createTestsSlice } from './store/TestsSlice';
import { TestSlice, createTestSlice } from './store/TestSlice';
import { GamesSlice, createGamesSlice } from './store/GamesSlice';
import { GameSlice, createGameSlice } from './store/GameSlice';

import { AchievesSlice, createAchievesSlice } from './store/AchievesSlice';


export type Store = StateSlice &
    ProfileSlice & ParentsSlice & AddressSlice &
    GroupsSlice & AttendanceSlice &
    EventsSlice & TestsSlice & TestSlice & GamesSlice & GameSlice & AchievesSlice ;

export const useStore = create<Store>((set, get) => ({
    ...createStateSlice(set, get),

    ...createProfileSlice(set, get),
    ...createParentsSlice(set, get),
    ...createAddressSlice(set, get),

    ...createGroupsSlice(set, get),
    ...createAttendanceSlice(set, get),

    ...createEventsSlice(set, get),
    ...createTestSlice(set, get),
    ...createTestsSlice(set, get),
    ...createGameSlice(set, get),
    ...createGamesSlice(set, get),

    ...createAchievesSlice(set, get),  
}));