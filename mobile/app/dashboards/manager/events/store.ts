import { create } from "zustand";
import { LoadingSlice, createLoadingSlice } from "../../../shared/httpClient";
import { CampsSlice, createCampsSlice } from "./CampsScreen/state";
import { EventsSlice, createEventsSlice } from "./EventsScreen/state";
// import { TestingSlice, createTestingSlice } from "./TestingScreen/state";
// import { CompetitionsSlice, createCompetitionsSlice } from "./CompetitionsScreen/state";
// import { HistorySlice, createHistorySlice } from "./HistoryScreen/state";
// import { DrillsSlice, createDrillsSlice } from "./DrillsScreen/state";
// import { DrillSlice, createDrillSlice } from "./DrillScreen/state";


export type Store = LoadingSlice & CampsSlice & EventsSlice 
  //CompetitionsSlice & HistorySlice & DrillsSlice & DrillSlice;

export const useStore = create<Store>((set, get) => ({
  ...createLoadingSlice(set),
  ...createCampsSlice(set, get),
  ...createEventsSlice(set, get),
  // ...createTestingSlice(set, get),
  // ...createCompetitionsSlice(set, get),
  // ...createHistorySlice(set, get),
  // ...createDrillsSlice(set, get),
  // ...createDrillSlice(set, get),
}));

export const configureStore = () => {
  useStore.getState();
};
