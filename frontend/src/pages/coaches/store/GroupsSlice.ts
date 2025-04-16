import {  Group } from '../model';
//import { Store } from '../store';


export interface GroupsSlice {
    groups: Group[];
    addGroup: () => void;
    removeGroup: (inx: number) => void;
}

export const createGroupsSlice = (set: any): GroupsSlice => ({
    
    groups: [],

    addGroup: () => set((state: any) => ({
        groups: [],
    })),

    removeGroup: (inx: number) => set((state: any) => ({
        groups: [],
    })),
});