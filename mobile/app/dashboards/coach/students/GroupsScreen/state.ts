import { Group, Student } from '../model';
import { get_groups, get_students } from '../http';
import { objectToJson } from '@/app/shared/utils';


export interface GroupsSlice {
  groups: Group[];
  students: Student[];

  group_id: number;
  student_id: number;

  loadGroups: (camp_id: number) => void;
  loadStudents: (group_id: number) => void;

  selectGroup: (groupId: number) => void;
  selectStudent: (student_id: number) => void;
}

export const createGroupsSlice = (set: any, get: any): GroupsSlice => ({
  students: [],
  groups: [],

  group_id: 0,
  student_id: 0,

  loadGroups: (camp_id: number) => {
    get_groups(camp_id, (groups: Group[]) => {
      set({ groups });
    })
  },

  loadStudents: (group_id: number) => {
    get_students(group_id, (students: Student[]) => {
      //alert(objectToJson(students))
      set({ students, group_id });
    })
  },

  selectGroup: (groupId: number) => {
    const { group_id, loadStudents }: GroupsSlice = get();
    if (groupId !== group_id) {
      loadStudents(groupId);
    } else {
      set({ group_id: 0, students: [] });
    }
  },

  selectStudent: (student_id: number) => set({ student_id }),
});
