import { Camp, Group, Student } from '../model';
import { get_camps, get_groups, get_students, create_group, delete_group } from '../http';
import { objectToJson, sanitizeName } from '@/app/shared/utils';


export interface GroupsSlice {
  camps: Camp[];
  groups: Group[];

  camp_id: number;
  camp_inx: number;
  camp_name: string;

  group_id: number;
  group_inx: number;
  group_name: string;

  isAddGroupAlert: boolean;

  loadCamps: () => void;
  loadGroups: (camp_id: number) => void;

  selectCamp: (campId: number, camp_inx: number) => void;
  selectGroup: (group_id: number, group_inx: number) => void;

  createGroup: (camp_id: number, name: string)=> void;

  showAddGroupAlert: () => void;
  hideAddGroupAlert: () => void;
}

export const createGroupsSlice = (set: any, get: any): GroupsSlice => ({
  camps: [],
  groups: [],

  camp_id: 0,
  camp_inx: -1,
  camp_name: '',

  group_id: 0,
  group_inx: -1,
  group_name: '',

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

  selectCamp: (campId: number, camp_inx: number) => {
    const { camps, camp_id, loadGroups }: GroupsSlice = get();
    if (campId !== camp_id) {
      set({
        camp_id: campId,
        camp_name: sanitizeName(camps[camp_inx].name),
      })
      loadGroups(campId);
    } 
  },

  selectGroup: (group_id: number, group_inx: number) => {
    const { groups }: GroupsSlice = get();
    
    set({
      group_id, group_inx,
      group_name: sanitizeName(groups[group_inx].name),
    })
  },

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
