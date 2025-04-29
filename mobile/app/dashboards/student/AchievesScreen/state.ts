import { Store } from "../store";
import { Student, Achieve, Test, Game, Event } from "../model";
import { get_student_achieves, update_student_achieve } from '../http';
import { ProfileSlice } from '../ProfileScreen/state';
import { objectToJson } from '../../../shared/utils';


export interface AshievesSlice {
  achieves: Achieve[];
  achieve_id: number;

  loadAchieves: () => void;
  selectAchieve: (achieve_id: number) => void;
}

export const createAshievesSlice = (set: any, get: () => Store): AshievesSlice => ({
  achieves: [],
  achieve_id: 0,

  loadAchieves: () => {
    const { student_id }: ProfileSlice = get();
    get_student_achieves(student_id, (achieves: Achieve[]) => {
      //alert(objectToJson(achieves))
      set({ achieves });
    })
  },

  selectAchieve: (achieve_id: number) => {
      const { isAchievementAdding }: ProfileSlice & AshievesSlice = get();

      if (isAchievementAdding) {
        const { achieves }: ProfileSlice & AshievesSlice = get();
        const achieve = achieves.find(el => el.id === achieve_id)!;
  
        if ( !achieve.in_profile) {
          const data = { "in_profile": true };
    
          update_student_achieve(achieve_id, data, (res => {
              if (res.isOk) {
                const { finishAdding }: ProfileSlice = get();
                finishAdding();
              }
          }))
        } 
      }
    }
});
