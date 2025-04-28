import { Store } from "../store";
import { Student, Achievement, Test, Game, Event } from "../model";
import { get_student, get_profile_achievements, get_last_test } from '../http';
import { get_last_game, get_upcoming_events, update_student_achieve} from '../http';
import { effectNames, RuleLevels, eventTypes } from '../../../shared/constants';
import { getTodayTimestamp } from '../../../shared/utils';


export interface ProfileSlice {
  student_id: number;
  student: Student;
  achievement_id: number;

  profile_achievements: Achievement[];
  last_test: Test;
  last_game: Game;
  upcoming_events: Event[];

  loadStudent: (studentId: number) => void;
  loadAchievements: (studentId: number) => void;

  clickAchievement: (achieve_id: number) => void;
  detachAchievement: () => void;
}

export const createProfileSlice = (set: any, get: () => Store): ProfileSlice => ({
  student_id: 0,
  student: { first_name: "FirstName", last_name: "LastName", gender: "Girl", age: 10, id: 0, active: true,
    photo: '', group_id: 3, group_extra_id: 0 },
  
  achievement_id: 0,
  profile_achievements: [{ id:0, image: 'medal', name: 'Medal', level: RuleLevels[0], effect: effectNames[0]}],

  last_test: { speed: 0, stamina: 0, climbing: 0, evasion: 0, hiding: 0 },
  last_game: {caughted: 0, freeded: 0 },

  upcoming_events: [{ id: 0, type: eventTypes[0], desc: "We going to running", timestamp: getTodayTimestamp() }],


  loadStudent:(student_id: number,) => {
    get_student(student_id, (student: Student) => {
      if (student) {
        set({ student, student_id });

        const {loadAchievements}: ProfileSlice = get();
        loadAchievements(student_id);

        get_last_test(student_id, (test: Test) => {
          set({ last_test: test });
        });

        get_last_game(student_id, (game: Game) => {
          set({ last_game: game });
        });

        get_upcoming_events(student.group_id, (events: Event[]) => {
          set({ upcoming_events: events });
        });
      }
    });
  },

  loadAchievements:(student_id: number) => {
    get_profile_achievements(student_id, (achievements: Achievement[]) => {
      set({ profile_achievements: achievements });
    });
  },

  clickAchievement: (achieve_id: number) => set({ achieve_id }),

  detachAchievement:() => {
    const { achievement_id, profile_achievements }: ProfileSlice = get();
    const achieve = profile_achievements.find(el => el.id === achievement_id);

    if (achieve) {
      const data = { "in_profile": false };

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
  },
});
