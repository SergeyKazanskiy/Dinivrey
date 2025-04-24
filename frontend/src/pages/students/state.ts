import { CampsSlice } from './store/CampsSlice';
import { get_camps, get_groups, get_students , get_liders} from './http';
import { Camp, Group, Lider, Student } from './model';
import { GroupsSlice } from './store/GroupsSlice';
import { StudentsSlice } from './store/StudentsSlice';
import { LidersSlice } from './store/LidersSlice';


export interface StateSlice {
    isStudentOpen: boolean;

    loadCamps: () => void;
    loadGroups: (camp_id: number) => void;
    loadStudents: (group_id: number) => void;
    loadLiders: (group_id: number) => void;

    closeStudent: () => void;
}

export const createStateSlice = (set: any, get: any): StateSlice => ({
    isStudentOpen: false,


    loadCamps: () => {
        get_camps((camps: Camp[]) => {
            const { setCamps, selectCamp, setGroups, setStudents }: CampsSlice & GroupsSlice & StudentsSlice = get();
            setCamps(camps);
            if (camps.length > 0) {
                const camp_id: number = camps[0].id;
                selectCamp(camp_id);
            } else {
                setGroups([]);
                setStudents([]);
            }
        })
    },

    loadGroups: (camp_id: number) => {
        get_groups(camp_id, (groups: Group[]) => {
            const { setGroups, selectGroup, setStudents }: GroupsSlice & StudentsSlice = get();
            setGroups(groups);
            if (groups.length > 0) {
                const group_id: number = groups[0].id;
                selectGroup(group_id, 0);
            } else {
                setStudents([]);
            }
        })
    },

    loadStudents: (group_id: number) => {
        get_students(group_id, (students: Student[]) => {
            const { setStudents }: StudentsSlice = get();
            setStudents(students);
        })
    },

    loadLiders: (group_id: number) => {
        get_liders(group_id, (liders: Lider[]) => {
            const { setLiders }: LidersSlice = get();
            setLiders(liders);
        })
    },

    closeStudent: () => set({ isStudentOpen: false })
});

