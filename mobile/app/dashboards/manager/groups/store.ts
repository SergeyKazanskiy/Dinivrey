import { create } from "zustand";
import { LoadingSlice, createLoadingSlice } from "../../../shared/httpClient";
import { GroupsSlice, createGroupsSlice } from "./GroupsScreen/state";
import { StudentsSlice, createStudentsSlice } from "./StudentsScreen/state";

import { ProfileSlice, createProfileSlice } from "./ProfileScreen/state";
import { StatisticsSlice, createStatisticsSlice } from "./StatisticsScreen/state";
import { AchievesSlice, createAchievesSlice } from "./AchievesScreen/state";
import { CommentsSlice, createCommentsSlice } from "./CommentsScreen/state";


export type Store = LoadingSlice & GroupsSlice & StudentsSlice &
  ProfileSlice & StatisticsSlice & AchievesSlice & CommentsSlice;

export const useStore = create<Store>((set, get) => ({
  ...createLoadingSlice(set),
  ...createGroupsSlice(set, get),
  ...createStudentsSlice(set, get),
  ...createProfileSlice(set, get),
  ...createStatisticsSlice(set, get),
  ...createAchievesSlice(set, get),
  ...createCommentsSlice(set, get),
}));

export const configureStore = () => {
  useStore.getState();
};