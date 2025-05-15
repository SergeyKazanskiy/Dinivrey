import { Store } from "../store";
import { Student, Parent, Attendance } from "../model";
import { get_student, get_student_parents } from '../http';
import { GroupsSlice } from '../GroupsScreen/state';
import { objectToJson } from '../../../../shared/utils';


export interface ProfileSlice {
  student: Student;

  initialParents: Parent[];
  parents: Parent[];

  attendance: Attendance;

  loadStudent: () => void;
}

export const createProfileSlice = (set: any, get: () => Store): ProfileSlice => ({
  student: { first_name: "FirstName", last_name: "LastName", gender: "Girl", age: 10, id: 0, active: true,
    photo: '', group_id: 3, group_extra_id: 0, summary_tests: '', summary_achievements: '', summary_games: '' },
  
  initialParents: [
    { id: 0, name: '', phone: '', email: ''},
    { id: 1, name: '', phone: '', email: ''},
  ],
  parents: [
    { id: 0, name: '', phone: '', email: ''},
    { id: 1, name: '', phone: '', email: ''},
  ],

  attendance: {trainings: 97, tests: 55, games: 34},

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
    })
  },
});
