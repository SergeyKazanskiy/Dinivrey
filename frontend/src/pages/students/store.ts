import { create } from 'zustand';
import { StateSlice, createStateSlice } from './state';
import { CampsSlice, createCampsSlice } from './store/CampsSlice';
import { GroupsSlice, createGroupsSlice } from './store/GroupsSlice';
import { StudentsSlice, createStudentsSlice } from './store/StudentsSlice';


export type Store = StateSlice & CampsSlice & GroupsSlice & StudentsSlice;

export const useStore = create<Store>((set, get) => ({
    ...createStateSlice(set, get),
    ...createCampsSlice(set, get),
    ...createGroupsSlice(set, get),
    ...createStudentsSlice(set, get),
}));