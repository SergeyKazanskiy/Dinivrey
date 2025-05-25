import { Schedule } from '../model';
import { create_group_schedule, delete_group_schedule, update_group_schedule } from '../http';
import { StudentsSlice } from './StudentsSlice';
import { GroupsSlice } from './GroupsSlice';
import { StateSlice } from '../state';
import { getChanges, objectToJson } from '../../../shared/utils';
import { weekDays } from '../../../shared/constants';


export interface SchedulesSlice {
    schedules: Schedule[];
    schedule_id: number;

    weekday: number;
    hour: number;
    minute: number;

    setSchedules: (schedules: Schedule[]) => void;
    selectSchedule: (id: number, weekday: number) => void;

    setDay: (weekday: number) => void;
    setTime: (h: number, m: number) => void;

    createSchedule: () => void;
    deleteSchedule: () => void;
}

export const createSchedulesSlice = (set: any, get: any): SchedulesSlice => ({
    schedules: [{id: 0, group_id: 0, weekday: 2, hour: 16, minute: 30},
        {id: 2, group_id: 0, weekday: 4, hour: 18, minute: 30}
    ],
    schedule_id: 1,

    weekday: 0,
    hour: 0,
    minute: 0,

    setSchedules: (schedules: Schedule[]) => set({ schedules, schedule_id: 0 }),

    selectSchedule: (id: number, inx: number) => {
        const { weekday }: SchedulesSlice = get();

        if (inx + 1 === weekday) {
            set({ schedule_id: 0, weekday: 0 });
        } else {
            set({ schedule_id: id, weekday: inx + 1 });
            const { schedules }: SchedulesSlice = get();
            const schedule = schedules.find(el => el.weekday === inx + 1)
            if (schedule) {
                set({hour: schedule.hour, minute: schedule.minute})
            }
        }
    },

    setDay: (weekday: number) => set({ weekday }),

    setTime: (h: number, m: number) => {
        const { schedule_id, hour, minute, schedules, updateGroup, groups, groupInx}: SchedulesSlice & GroupsSlice= get();
        
        if ( h !== hour) {
            update_group_schedule(schedule_id, {hour: h}, (res)=> {
                if (res.isOk) {
                    const schedule = schedules.find(el => el.id === schedule_id)!;
                    schedule.hour = h;
                    set({ hour: h });

                    updateGroup(groups[groupInx].name, getDescription(schedules));
                }
            })
        }
        if ( m !== minute) {
            update_group_schedule(schedule_id, {minute: m}, (res)=> {
                if (res.isOk) {
                    const schedule = schedules.find(el => el.id === schedule_id)!;
                    schedule.minute = m;
                    set({ minute: m });

                    updateGroup(groups[groupInx].name, getDescription(schedules));
                }
            })
        }
    },

    createSchedule: () => {
        const { group_id, weekday, updateGroup, groups, groupInx }: SchedulesSlice & GroupsSlice = get();
        const hour = 16; const minute = 0;
        const schedule: Omit<Schedule, 'id'> = { group_id, weekday, hour, minute }
        
        create_group_schedule(schedule, (res)=> {
            if (res) {
                const newShedule: Schedule = {id: res.id, group_id, weekday, hour, minute }
                
                set((state: SchedulesSlice) => ({
                    schedules: [...state.schedules, newShedule],
                    schedule_id: res.id,
                }));
                const desc = weekDays[weekday - 1] + ' ' + hour + ' : 00'
                updateGroup(groups[groupInx].name, desc);
            }
        })
    },

    deleteSchedule: () => {
        const { schedule_id, updateGroup, groups, groupInx, schedules }: SchedulesSlice & GroupsSlice = get();

        delete_group_schedule(schedule_id, (res) => {
            if (res.isOk) {
                set((state: SchedulesSlice) => ({
                    schedules: state.schedules.filter(el => el.id !== schedule_id),
                    schedule_id: 0
                }));
                const desc = getDescription(schedules);
                updateGroup(groups[groupInx].name, desc);
            };
        });
    },
});

function getDescription(schedules: Schedule[]): string {
    const dates = schedules.map(el => ' ' +  weekDays[el.weekday - 1] + ' ' + el.hour + ':' + el.minute)
    return dates.toString()
}