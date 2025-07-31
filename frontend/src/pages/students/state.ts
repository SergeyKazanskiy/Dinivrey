import { CampsSlice } from './store/CampsSlice';
import { get_camps, get_groups, get_group_schedule, get_students , get_liders} from './http';
import { Camp, Group, Lider, Schedule, Student } from './model';
import { GroupsSlice } from './store/GroupsSlice';
import { StudentsSlice } from './store/StudentsSlice';
import { LidersSlice } from './store/LidersSlice';
import { SchedulesSlice } from './store/SchedulesSlice';
import { objectToJson } from '../../shared/utils';


export interface StateSlice {
    isStudentOpen: boolean;

    loadCamps: () => void;
    loadGroups: (camp_id: number) => void;
    loadSchedule: (group_id: number) => void;
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
                selectCamp(camp_id, 0);
            } else {
                setGroups([]);
                setStudents([]);
            }
        })
    },

    loadGroups: (camp_id: number) => {
        get_groups(camp_id, (groups: Group[]) => {
            //alert(objectToJson(groups))
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

    loadSchedule: (group_id: number) => {
        get_group_schedule(group_id, (schedules: Schedule[]) => {
            const { setSchedules }: SchedulesSlice = get();
            setSchedules(schedules);
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

