import { Achieve, Achievement, AchieveAttach } from "../model";
import { get_student_achieves, get_base_achieves } from '../http';
import { attach_student_achieve, detach_student_achieve, update_student_achieves_summary } from '../http';
import { GroupsSlice } from '../GroupsScreen/state';
import { objectToJson } from '../../../../shared/utils';
import {  RuleLevels } from '../../../../shared/constants';


export interface AchievesSlice {
  studentAchieves: Achievement[];
  baseAchieves: Achieve[];

  achievement_id: number;
  achieve_id: number;

  loadStudentAchieves: () => void;
  loadBaseAchieves: (category: string) => void;

  selectAchieve:(achieve_id: number) => void; //AchievesPanel For further possibility of deletion 
  selectAchievement:(achievement_id: number) => void;

  attachAchieve:(base_achieve_id: number) => void; //AchievesModal attach BaseAchieve to the student (manual-trigger)   
  detachAchieve: () => void; //AchievesPanel detach selected in AchievesPanel achieve (manual-trigger)

  setAchievesSummary:(summary: string) => void;
}

export const createAchievesSlice = (set: any, get: any): AchievesSlice => ({
  studentAchieves: [],
  baseAchieves: [],
  
  achievement_id: 0,
  achieve_id: 0,

  loadStudentAchieves: () => {
    const { student_id }: GroupsSlice = get();
    get_student_achieves(student_id, (achieves: Achievement[]) => {
       set({studentAchieves: achieves});
    })
  },

  loadBaseAchieves: (category: string) => {
    get_base_achieves(category, 'Manual', (achieves: Achieve[]) => {
       const {studentAchieves}: AchievesSlice = get();
       const ids: number[] = studentAchieves.map(el => el.achieve_id);
       const unik: Achieve[] = achieves.filter(el => !ids.includes(el.id))
       set({ baseAchieves: unik})
    })
  },

  selectAchievement:(achievement_id: number) => set((state: AchievesSlice) => ({
    achievement_id: state.achievement_id === achievement_id ? 0 : achievement_id,
    achieve_id: 0,
  })),

  selectAchieve:(achieve_id: number) => {
    const {attachAchieve}: AchievesSlice = get();
    attachAchieve(achieve_id);

    set((state: AchievesSlice) => ({
       achieve_id: state.achieve_id === achieve_id ? 0 : achieve_id,
       achievement_id: 0,
    }))},

 
  attachAchieve:(achieve_id: number) => {
      set({ isBaseAchieves: false });

      const { student_id }: GroupsSlice = get();
      const data: AchieveAttach = { student_id, achieve_id, level: 1, in_profile: false }

      attach_student_achieve(data, (achievement => {
          if (achievement) {
              set((state: AchievesSlice) => ({
                  studentAchieves: [...state.studentAchieves, achievement],
                  baseAchieves: state.baseAchieves.filter(el => el.id !== achieve_id),
              }));
          }
      }))
  },

  detachAchieve:() => {
      const { achievement_id }: AchievesSlice = get();
     
      detach_student_achieve(achievement_id, (res => {
          if (res.isOk) {
              set((state: AchievesSlice) => ({
                  studentAchieves: state.studentAchieves.filter(el => el.id !== achievement_id),
                  achievement_id: 0,
              }));
          }
      }))
  },

  setAchievesSummary:(summary: string) => {
    const { student_id }: GroupsSlice = get();

    update_student_achieves_summary(student_id, {summary_achievements: summary},(res => {
      if (res.isOk) {
          set({summary});
      }
    }))
  }
});
  