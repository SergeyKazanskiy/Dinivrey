import { Camp, Group, Student } from '../model';
import { get_camps, get_groups, get_students } from '../http';
import { objectToJson } from '@/app/shared/utils';


export interface StudentsSlice {
  students: Student[];
  student_id: number;

  loadStudents: (group_id: number) => void;
  selectStudent: (student_id: number) => void;
  clearStudents: () => void;
}

export const createStudentsSlice = (set: any, get: any): StudentsSlice => ({
  students: [],
  student_id: 0,

  loadStudents: (group_id: number) => {
    get_students(group_id, (students: Student[]) => {
      //alert(objectToJson(students))
      set({ students });
    })
  },

  selectStudent: (student_id: number) => set({ student_id }),
  clearStudents: () => set({ student_id: 0, students: [] }),
});
