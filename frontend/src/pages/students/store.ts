import { create } from 'zustand';
import { StateSlice, createStateSlice } from './state';
import { CampsSlice, createCampsSlice } from './store/CampsSlice';
import { GroupsSlice, createGroupsSlice } from './store/GroupsSlice';
import { SchedulesSlice, createSchedulesSlice } from './store/SchedulesSlice';
import { StudentsSlice, createStudentsSlice } from './store/StudentsSlice';
import { LidersSlice, createLidersSlice } from './store/LidersSlice';


export type Store = StateSlice & CampsSlice & GroupsSlice & SchedulesSlice & StudentsSlice & LidersSlice;

export const useStore = create<Store>((set, get) => ({
    ...createStateSlice(set, get),
    ...createCampsSlice(set, get),
    ...createGroupsSlice(set, get),
    ...createSchedulesSlice(set, get),
    ...createStudentsSlice(set, get),
    ...createLidersSlice(set, get),
}));