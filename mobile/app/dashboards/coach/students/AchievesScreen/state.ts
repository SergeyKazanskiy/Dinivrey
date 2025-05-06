import { Store } from "../store";
import { Achieve } from "../model";
import { get_student_achieves } from '../http';
import { GroupsSlice } from '../GroupsScreen/state';
import { objectToJson } from '../../../../shared/utils';


export interface AshievesSlice {
  achieves: Achieve[];
  achieve_id: number;

  loadAchieves: () => void;
  selectAchieve: () => void;
}

export const createAshievesSlice = (set: any, get: any): AshievesSlice => ({
  achieves: [],
  achieve_id: 0,

  loadAchieves: () => {
    const { student_id }: GroupsSlice = get();

    get_student_achieves(student_id, (achieves: Achieve[]) => {
      //alert(objectToJson(achieves))
      set({ achieves });
    })
  },

  selectAchieve: () => {}
});
