import { create } from "zustand";
import { LoadingSlice, createLoadingSlice } from "../../shared/httpClient";
import { ProfileState, createProfileState } from "./ProfileScreen/state";
import { LidersState, createLidersState } from "./LidersScreen/state";

export type Store = LoadingSlice & ProfileState & LidersState;

export const useStore = create<Store>((set, get) => ({
  ...createLoadingSlice(set),
  ...createProfileState(set, get),
  ...createLidersState(set, get),
}));

export const configureStore = () => {
  useStore.getState();
};