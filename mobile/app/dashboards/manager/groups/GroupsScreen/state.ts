import { Camp, Group, Student } from '../model';
import { get_camps, get_groups, get_students, create_group, delete_group } from '../http';
import { objectToJson } from '@/app/shared/utils';


export interface GroupsSlice {
  camps: Camp[];
  groups: Group[];

  camp_id: number;
  group_id: number;
  groupInx: number;

  isAddGroupAlert: boolean;

  loadCamps: () => void;
  loadGroups: (camp_id: number) => void;

  selectCamp: (campId: number) => void;
  selectGroup: (group_id: number) => void;

  createGroup: (camp_id: number, name: string)=> void;

  showAddGroupAlert: () => void;
  hideAddGroupAlert: () => void;
}

export const createGroupsSlice = (set: any, get: any): GroupsSlice => ({
  camps: [],
  groups: [],

  camp_id: 0,
  group_id: 0,
  groupInx: -1,

  isAddGroupAlert: false,


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
      set({ groups, group_id: 0 });
    })
  },

  selectCamp: (campId: number) => {
    const { camp_id, loadGroups }: GroupsSlice = get();
    if (campId !== camp_id) {
      set({ camp_id: campId })
      loadGroups(campId);
    } 
  },

  selectGroup: (group_id: number) => set({ group_id }),

  createGroup: (camp_id: number, name: string) => {
    set({isAddGroupAlert: false});
      const data: Omit<Group, 'id'> = { camp_id, name, description: 'Enter' }

      create_group(data, (res => {
        if (res) {
          const newGroup: Group = {id: res.id, camp_id, name, description: 'Enter' };
          set((state: GroupsSlice) => ({ groups: [...state.groups, newGroup] }));
        }
      }));
  },

  showAddGroupAlert: () => set({isAddGroupAlert: true}),
  hideAddGroupAlert: () => set({isAddGroupAlert: false}),
});
