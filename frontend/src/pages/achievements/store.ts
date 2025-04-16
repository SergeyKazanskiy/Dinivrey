import { create } from 'zustand';
import { StateSlice, createStateSlice } from './state';
import { AchieveSlice, createAchieveSlice } from './store/AchieveSlice';
import { RulesSlice, createRulesSlice } from './store/RulesSlice';
import { ReportSlice, createReportSlice } from './store/ReportSlice';
import { GifsSlice, createGifsSlice } from './store/GifsSlice';


export type Store = StateSlice & AchieveSlice & RulesSlice & ReportSlice & GifsSlice ;

export const useStore = create<Store>((set, get) => ({
    ...createStateSlice(set, get),
    ...createAchieveSlice(set, get),
    ...createRulesSlice(set, get),
    ...createReportSlice(set),
    ...createGifsSlice(set),
}));