import { create } from 'zustand';
import { StateSlice, createStateSlice } from './state';
import { MetricsSlice, createMetricsSlice } from './store/MetricsSlice';


export type Store = StateSlice & MetricsSlice ;

export const useStore = create<Store>((set, get) => ({
    ...createStateSlice(set, get),
    ...createMetricsSlice(set, get),
}));