import { Store } from "../store";
import { Achieve, Achievement } from "../model";
import { get_student_achieves, update_student_achieve, get_locked_achieves } from '../http';
import { ProfileSlice } from '../ProfileScreen/state';
import { objectToJson } from '../../../shared/utils';


export interface AshievesSlice {
  unlocked_achieves: Achievement[];
  locked_achieves: Achieve[];

  profile_place: number;
  achievement_id: number; 

  isAchievesModal: boolean;
  profile_achievements: Achievement[];

  loadAchieves: () => void;

  selectPlace: (profilePlace: number) => void;
  selectAchieve: (achieve_id: number) => void;

  showAchievesModal: () => void;
  hideAchievesModal: () => void;

  detachAchievement: () => void;
}

export const createAshievesSlice = (set: any, get: () => Store): AshievesSlice => ({
  unlocked_achieves: [],
  locked_achieves: [],

  profile_place: 0,
  achievement_id: 0,

  isAchievesModal: false,
  profile_achievements: [],

  loadAchieves: () => {
    const { student_id }: ProfileSlice = get();
    get_student_achieves(student_id, (achievements: Achievement[]) => {
      //alert(objectToJson(achievements))
      set({unlocked_achieves: achievements });

      const profileAchievements = achievements.filter(el => el.in_profile === true);
      if (profileAchievements) {
         set({ profile_achievements: profileAchievements.sort((a, b) => a.profile_place - b.profile_place) });
      }
    })
    get_locked_achieves(student_id, (achieves: Achieve[]) => {
      //alert(objectToJson(achieves))
      set({ locked_achieves: achieves });
    })
  },

  selectPlace: (profilePlace: number) => {
    const { profile_place }: AshievesSlice = get();

    set({ profile_place: profile_place === profilePlace ? 0 : profilePlace});
  },

  selectAchieve: (achieve_id: number) => {
    const { profile_place }:  AshievesSlice = get();

    if ( profile_place > 0 ) {
      const { unlocked_achieves }: ProfileSlice & AshievesSlice = get();

      const newAchieve = unlocked_achieves.find(el => el.id === achieve_id)!;
      const oldAchieve = unlocked_achieves.find(el => el.profile_place === profile_place);
  
      update_student_achieve(achieve_id, { "in_profile": true, profile_place }, (res => {
          if (res.isOk) {
            if (oldAchieve) {
              update_student_achieve(oldAchieve.id, { "in_profile": false, "profile_place": 0 }, (res => {
                if (res.isOk) {
                  oldAchieve.in_profile = false;
                  oldAchieve.profile_place = 0;
                  newAchieve.in_profile = true;
                  newAchieve.profile_place = profile_place;

                  const profileAchievements = unlocked_achieves.filter(el => el.in_profile === true);
                  if (profileAchievements) {
                    set({
                      profile_achievements: profileAchievements.sort((a, b) => a.profile_place - b.profile_place),
                      profile_place: 0
                    });
                  }
                }
              }));
            } else {
              newAchieve.in_profile = true;
              newAchieve.profile_place = profile_place;

              const profileAchievements = unlocked_achieves.filter(el => el.in_profile === true);
              if (profileAchievements) {
                set({
                  profile_achievements: profileAchievements.sort((a, b) => a.profile_place - b.profile_place),
                  profile_place: 0
                });
              }
            }
          }
      }));
    }
  },

  showAchievesModal: () => set({ isAchievesModal: true }),
  hideAchievesModal: () => set({ isAchievesModal: false, profile_place: 0 }),

  detachAchievement: () => {
      const { achievement_id }: AshievesSlice = get();
      
    },  
});
