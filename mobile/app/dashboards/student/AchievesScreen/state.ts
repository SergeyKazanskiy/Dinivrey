import { Store } from "../store";
import { Student, Achieve, Test, Game, Event } from "../model";
import { get_student_achieves, update_student_achieve } from '../http';
import { ProfileSlice } from '../ProfileScreen/state';


export interface AshievesSlice {
  achieves: Achieve[];
  achieve_id: number;

  loadAchieves: () => void;
  selectAchieve: (achieve_id: number) => void;
  attachAchievement:() => void;
}

export const createAshievesSlice = (set: any, get: () => Store): AshievesSlice => ({
  achieves: [],
  achieve_id: 0,

  loadAchieves: () => {
    const { student_id }: ProfileSlice = get();
    get_student_achieves(student_id, (achieves: Achieve[]) => {
      set({ achieves });
    })
  },

  selectAchieve: (achieve_id: number) => {
    set({ achieve_id });
  },

  attachAchievement:() => {
      const { achievement_id, profile_achievements }: ProfileSlice = get();
      const achieve = profile_achievements.find(el => el.id === achievement_id);
  
      if (achieve) {
        const data = { "in_profile": true };
  
        update_student_achieve(achievement_id, data, (res => {
            if (res.isOk) {
                set((state: ProfileSlice) => ({
                  profile_achievements: state.profile_achievements.filter(el => el.id !== achievement_id ),
                  achievement_id: 0,
                }));
            }
        }))
      } else {
          alert('Error!')
      }
    }
});
