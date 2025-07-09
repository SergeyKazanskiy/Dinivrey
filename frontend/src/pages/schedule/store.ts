import { create } from 'zustand';
import { StateSlice, createStateSlice } from './state';
import { CampsSlice, createCampsSlice} from './store/CampsSlice';
import { ScheduleSlice, createScheduleSlice} from './store/ScheduleSlice';

export type Store = StateSlice & CampsSlice & ScheduleSlice;

export const useStore = create<Store>((set, get) => ({
    ...createStateSlice(set, get),
    ...createCampsSlice(set, get),
    ...createScheduleSlice(set, get),
}));