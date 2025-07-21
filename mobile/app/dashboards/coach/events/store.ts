import { create } from "zustand";
import { LoadingSlice, createLoadingSlice } from "../../../shared/httpClient";
import { EventsSlice, createEventsSlice } from "./EventsScreen/state";
import { AttendanceSlice, createAttendanceSlice } from "./AttendanceScreen/state";
import { TestingSlice, createTestingSlice } from "./TestingScreen/state";
import { CompetitionsSlice, createCompetitionsSlice } from "./CompetitionsScreen/state";
import { HistorySlice, createHistorySlice } from "./HistoryScreen/state";
import { DrillsSlice, createDrillsSlice } from "./DrillsScreen/state";
import { DrillSlice, createDrillSlice } from "./DrillScreen/state";
import { GamingSlice, createGamingSlice } from "./GamingScreen/state";
import { GameMachine, createGameMachine } from "./GamingScreen/machine";
import { ReportSlice, createReportSlice } from "./GamingScreen/data";


export type Store = LoadingSlice & EventsSlice & AttendanceSlice & TestingSlice &
  CompetitionsSlice & HistorySlice & DrillsSlice & DrillSlice & GamingSlice & GameMachine & ReportSlice;

export const useStore = create<Store>((set, get) => ({
  ...createLoadingSlice(set),
  ...createEventsSlice(set, get),
  ...createAttendanceSlice(set, get),
  ...createTestingSlice(set, get),
  ...createCompetitionsSlice(set, get),
  ...createHistorySlice(set, get),
  ...createDrillsSlice(set, get),
  ...createDrillSlice(set, get),
  ...createGamingSlice(set, get),
  ...createGameMachine(set, get),
  ...createReportSlice(set, get),
}));

export const configureStore = () => {
  useStore.getState();
};
