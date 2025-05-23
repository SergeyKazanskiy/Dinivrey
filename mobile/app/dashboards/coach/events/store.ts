import { create } from "zustand";
import { LoadingSlice, createLoadingSlice } from "../../../shared/httpClient";
import { EventsSlice, createEventsSlice } from "./EventsScreen/state";
import { AttendanceSlice, createAttendanceSlice } from "./AttendanceScreen/state";
import { TestingSlice, createTestingSlice } from "./TestingScreen/state";
import { CompetitionsSlice, createCompetitionsSlice } from "./CompetitionsScreen/state";
import { HistorySlice, createHistorySlice } from "./HistoryScreen/state";


export type Store = LoadingSlice & EventsSlice & AttendanceSlice & TestingSlice & CompetitionsSlice & HistorySlice;

export const useStore = create<Store>((set, get) => ({
  ...createLoadingSlice(set),
  ...createEventsSlice(set, get),
  ...createAttendanceSlice(set, get),
  ...createTestingSlice(set, get),
  ...createCompetitionsSlice(set, get),
  ...createHistorySlice(set, get),
}));

export const configureStore = () => {
  useStore.getState();
};
