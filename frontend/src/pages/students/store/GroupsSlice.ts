import { Group } from '../model';
import { create_group, get_groups, delete_group, update_group } from '../http';
import { StudentsSlice } from './StudentsSlice';
import { CampsSlice } from './CampsSlice';
import { StateSlice } from '../state';
import { getChanges } from '../../../shared/utils';
import { sanitizeName } from '../../../shared/utils';


export interface GroupsSlice {
    groups: Group[];
    group_id: number;
    groupInx: number;
    group_name: string;

    setGroups: (groups: Group[]) => void;
    selectGroup: (id: number, inx: number) => void;

    createGroup: () => void;
    updateGroup: (name: string, desc: string) => void;
    deleteGroup: () => void;
}

export const createGroupsSlice = (set: any, get: any): GroupsSlice => ({
    groups: [
        { id: 1, camp_id: 1, name: 'Group 1', description: 'Enter' },
        { id: 2, camp_id: 1, name: 'Group 2', description: 'Enter' },
        { id: 3, camp_id: 1, name: 'Group 3', description: 'Enter' },
        { id: 4, camp_id: 1, name: 'Group 4', description: 'Enter' },
    ],
    group_id: 1,
    groupInx: -1,
    group_name: '',


    setGroups: (groups: Group[]) => {
        set({ groups, group_id: 0, groupInx: -1 });

    },

    selectGroup: (id: number, inx: number) => {
        const { group_id, groups }: GroupsSlice = get();

        if (id !== group_id) {
            set({
                group_id: id,
                groupInx: inx,
                group_name: sanitizeName(groups[inx].name)}
            );

            const { loadStudents }: StateSlice = get();
            loadStudents(id);
        } 
    },

    createGroup: () => {
        const { camp_id, groups }: GroupsSlice & CampsSlice = get();

        const group: Omit<Group, 'id'> = {
            camp_id,
            name: 'Group ' + (groups.length + 1),
            description: 'Enter'
        }

        create_group(group, (res)=> {
            if (res) {
                set((state: GroupsSlice) => ({
                    groups: [...state.groups, {...group, id: res.id}],
                    group_id: res.id,
                    groupInx: state.groups.length
                }));
            }
        })
    },

    updateGroup: (name: string, description: string) => {
        const { camp_id, group_id, groups }: CampsSlice & GroupsSlice & StudentsSlice = get();
        const updatedGroup: Group = {id: group_id, camp_id, name, description}; 
        const group = groups.find(item => item.id === group_id)!
        const data = getChanges(group, updatedGroup);

        update_group(group_id, data, (res)=> {
            if (res.isOk) {
                if (data.name) group.name = name;
                if (data.description) group.description = description;

                set((state: GroupsSlice) => ({
                    groups: state.groups.map((el) => el.id === group_id ? group : el),
                }));
            }
        })
    },

    deleteGroup: () => {
        const { group_id, students }: GroupsSlice & StudentsSlice = get();
        if (students.length > 0) {
            alert('Cannot be deleted because there are students in the group')
        } else {
            delete_group(group_id, (res) => {
                if (res.isOk) {
                    set((state: GroupsSlice) => ({
                        groups: state.groups.filter(el => el.id !== group_id),
                        group_id: 0, groupInx: -1
                    }));
                };
            });
        };
    },
});