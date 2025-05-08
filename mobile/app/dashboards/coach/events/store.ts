import { create } from "zustand";
import { LoadingSlice, createLoadingSlice } from "../../../shared/httpClient";

import { EventsSlice, createEventsSlice } from "./EventsScreen/state";
import { AttendanceSlice, createAttendanceSlice } from "./AttendanceScreen/state";
import { TestingSlice, createTestingSlice } from "./TestingScreen/state";

//import { StatisticsSlice, createStatisticsSlice } from "./StatisticsScreen/state";
//import { AshievesSlice, createAshievesSlice } from "./AchievesScreen/state";


export type Store = LoadingSlice & EventsSlice & AttendanceSlice & TestingSlice;

export const useStore = create<Store>((set, get) => ({
  ...createLoadingSlice(set),
  ...createEventsSlice(set, get),
  ...createAttendanceSlice(set, get),
  ...createTestingSlice(set, get),
  //...createStatisticsSlice(set, get),
  //...createAshievesSlice(set, get),
}));

export const configureStore = () => {
  useStore.getState();
};
