import { Group, Student } from '../model';
import { get_groups, get_students } from '../http';
import { objectToJson, sanitizeName } from '@/app/shared/utils';


export interface GroupsSlice {
  groups: Group[];
  students: Student[];

  camp_id: number;
  camp_name: string;

  group_id: number;
  group_inx: number;
  group_name: string;

  student_id: number;

  loadGroups: (coach_id: number) => void;
  loadStudents: (group_id: number) => void;

  selectGroup: (groupId: number, group_inx: number) => void;
  selectStudent: (student_id: number) => void;
}

export const createGroupsSlice = (set: any, get: any): GroupsSlice => ({
  students: [],
  groups: [],

  camp_id: 0,
  camp_name: '',

  group_id: 0,
  group_inx: -1,
  group_name: '',

  student_id: 0,

  loadGroups: (coach_id: number) => {

    get_groups(coach_id, (groups: Group[]) => {
      set({ groups });
    })
  },

  loadStudents: (group_id: number) => {
    get_students(group_id, (students: Student[]) => {
      //alert(objectToJson(students))
      set({ students, group_id });
    })
  },

  selectGroup: (groupId: number, group_inx: number) => {
    const { groups, group_id, loadStudents }: GroupsSlice = get();
    if (groupId !== group_id) { // ???
      set({group_id, group_inx,
        group_name: sanitizeName(groups[group_inx].name),
        camp_id: groups[group_inx].camp_id,
        camp_name: sanitizeName(groups[group_inx].camp_name),
      });

      loadStudents(groupId);
    } else {
      set({ group_id: 0, group_inx: -1, group_name: '', students: []});
    }
  },

  selectStudent: (student_id: number) => set({ student_id }),
});
