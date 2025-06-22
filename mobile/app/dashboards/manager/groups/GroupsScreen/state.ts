import { Camp, Group, Student } from '../model';
import { get_camps, get_groups, get_students } from '../http';
import { objectToJson } from '@/app/shared/utils';


export interface GroupsSlice {
  camps: Camp[];
  groups: Group[];
  students: Student[];

  camp_id: number;
  group_id: number;
  student_id: number;

  loadCamps: () => void;
  loadGroups: (camp_id: number) => void;
  loadStudents: (group_id: number) => void;

  selectCamp: (campId: number) => void;
  selectGroup: (group_id: number) => void;
  selectStudent: (student_id: number) => void;
}

export const createGroupsSlice = (set: any, get: any): GroupsSlice => ({
  camps: [],
  students: [],
  groups: [],

  camp_id: 0,
  group_id: 0,
  student_id: 0,


  loadCamps: () => {
    get_camps((camps: Camp[]) => {
      set({ camps });
      if (camps.length > 0) {
        const camp_id = camps[0].id;
        const { loadGroups }: GroupsSlice = get();

        set({camp_id});
        loadGroups(camp_id);
      }
    })
  },

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

  selectCamp: (campId: number) => {
    const { camp_id, loadGroups }: GroupsSlice = get();
    if (campId !== camp_id) {
      set({ camp_id: campId })
      loadGroups(campId);
    } 
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
