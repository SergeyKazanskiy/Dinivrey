import {  Group, StudentGroups } from '../model';
import { StateSlice } from '../state';
import { get_groups } from '../http';


export interface GroupsSlice {
    camp_id: number;
    groups: Group[];
    extra_groups: Group[];

    group_id: number;
    group_extra_id: number;

    isGroupsChanged: boolean;
    
    setCamp:(camp_id: number) => void;
    setGroups:(groups: Group[]) => void;
    setExtraGroups:(extra_groups: Group[]) => void;

    setGroup:(group_id: number) => void;
    setGroupExtra:(group_extra_id: number) => void;

    checkGroups:() => void;
    getStudentGroups:() => StudentGroups;
}

export const createGroupsSlice= (set: any, get: any): GroupsSlice => ({
    camp_id:  0,
    groups: [],
    extra_groups: [],

    group_id:  0,
    group_extra_id:  0,
    isGroupsChanged: false,


    setCamp:(camp_id: number) => {
        get_groups(camp_id, (groups => {
            set({ camp_id, groups, extra_groups: groups })
        }));
    },

    setGroups:(groups: Group[]) => set({ groups }),
    setExtraGroups:(extra_groups: Group[]) => set({ extra_groups }),


    setGroup:(group_id: number) => set({ group_id }),
    setGroupExtra:(group_extra_id: number) => set({ group_extra_id }),

    checkGroups:() => {
        const { student, group_id, group_extra_id }: StateSlice & GroupsSlice= get();
        if (student) {
            const isGroupsChanged = 
            group_id !== student.group_id ||
            group_extra_id !== student.group_extra_id;
            set({ isGroupsChanged }); 
        }   
    },

    getStudentGroups:() => {
        const { group_id, group_extra_id }: GroupsSlice = get();
        return { group_id, group_extra_id }
    }
});