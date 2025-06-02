import { Store } from "../store";
import { Student, Parent, Attendance, Test } from "../model";
import { get_student, get_student_parents, get_last_test } from '../http';
import { GroupsSlice } from '../GroupsScreen/state';
import { objectToJson } from '../../../../shared/utils';


export interface ProfileSlice {
  student: Student;
  last_test: Test;

  initialParents: Parent[];
  parents: Parent[];

  attendance: Attendance;
  isCommentsScreen: boolean;

  loadStudent: () => void;
  showComments: (isCommentsScreen: boolean) => void;
}

export const createProfileSlice = (set: any, get: () => Store): ProfileSlice => ({
  student: { first_name: "FirstName", last_name: "LastName", gender: "Girl", age: 10, id: 0, active: true,
    photo: '', group_id: 3, group_extra_id: 0, summary_tests: '', summary_achievements: '', summary_games: '' },
  
  last_test: { id: 0, timestamp: 0, speed: 0, stamina: 0, climbing: 0, evasion: 0, hiding: 0 },

  initialParents: [
    { id: 0, name: '', phone: '', email: ''},
    { id: 1, name: '', phone: '', email: ''},
  ],
  parents: [
    { id: 0, name: '', phone: '', email: ''},
    { id: 1, name: '', phone: '', email: ''},
  ],

  attendance: {trainings: 97, tests: 55, games: 34},
  isCommentsScreen: false,

  loadStudent: () => {
    const { student_id }: GroupsSlice = get();

    get_student(student_id, (student: Student) => {
      //alert(objectToJson(student))
      set({ student });
      
      get_student_parents(student_id, (parents: Parent[]) => {
        //alert(objectToJson(parents))
        if (parents.length === 2) {
          set({ parents });
        } else {
          const { initialParents }: ProfileSlice = get();
          set({ parents: initialParents });
        }
      });

      get_last_test(student_id, (tests: Test[]) => {
        if (tests.length > 0) {
          set({ last_test: tests[0]});
        } else {
          const emptyTest: Test = { id: 0, timestamp: 0, speed: 0, stamina: 0, climbing: 0, evasion: 0, hiding: 0 };
          set({ last_test: emptyTest});
        }
      });
    })
  },

  showComments: (isCommentsScreen: boolean) => set({isCommentsScreen}),
  
});
