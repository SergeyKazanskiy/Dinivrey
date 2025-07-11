import { create } from "zustand";
import { LoadingSlice, createLoadingSlice } from "../../../shared/httpClient";
import { CoachesSlice, createCoachesSlice } from "./CoachesScreen/state";
import { CoachSlice, createCoachSlice } from "./CoachScreen/state";


export type Store = LoadingSlice & CoachesSlice & CoachSlice 

export const useStore = create<Store>((set, get) => ({
  ...createLoadingSlice(set),
  ...createCoachesSlice(set, get),
  ...createCoachSlice(set, get),
}));

export const configureStore = () => {
  useStore.getState();
};
