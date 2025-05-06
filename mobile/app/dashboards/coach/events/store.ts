import { create } from "zustand";
import { LoadingSlice, createLoadingSlice } from "../../../shared/httpClient";


//import { ProfileSlice, createProfileSlice } from "./ProfileScreen/state";
//import { LidersSlice, createLidersSlice } from "./LidersScreen/state";
//import { EventsSlice, createEventsSlice } from "./EventsScreen/state";
//import { StatisticsSlice, createStatisticsSlice } from "./StatisticsScreen/state";
//import { AshievesSlice, createAshievesSlice } from "./AchievesScreen/state";


export type Store = LoadingSlice //& ProfileSlice & LidersSlice & EventsSlice & StatisticsSlice & AshievesSlice;

export const useStore = create<Store>((set, get) => ({
  ...createLoadingSlice(set),
  //...createProfileSlice(set, get),
  //...createLidersSlice(set, get),
  //...createEventsSlice(set, get),
  //...createStatisticsSlice(set, get),
  //...createAshievesSlice(set, get),
}));

export const configureStore = () => {
  useStore.getState();
};
