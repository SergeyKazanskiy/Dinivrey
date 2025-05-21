import { create } from 'zustand';
import { StateSlice, createStateSlice } from './state';
import { DrillSlice, createDrillSlice } from './store/DrillSlice';
import { DrillsSlice, createDrillsSlice } from './store/DrillsSlice';


export type Store = StateSlice & DrillSlice & DrillsSlice ;

export const useStore = create<Store>((set, get) => ({
    ...createStateSlice(set, get),
    ...createDrillSlice(set, get),
    ...createDrillsSlice(set, get),
}));