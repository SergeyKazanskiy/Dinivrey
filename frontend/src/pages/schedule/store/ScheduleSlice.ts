import { CoachShort, Schedule } from "../model";
import { change_group_schedule_coach } from '../http';
import { objectToJson } from "../../../shared/utils";
import { weekDays } from '../../../shared/constants';
import { CampsSlice } from './CampsSlice';


export interface ScheduleSlice {
    days: {day: number, weekday: string}[];
    schedules: Schedule[];
    coaches: CoachShort[];
    
    schedule_id: number;
    isCoachesView: boolean;
    today: number; //currentTimestamp

    setSchedules: (schedules: Schedule[]) => void;
    selectSchedule: (schedule_id: number) => void;
    selectNewCoach: (camp_id: number, coach_id: number) => void;

    setToday: (today: number) => void;
}

export const createScheduleSlice = (set: any, get: any): ScheduleSlice => ({     
    days: [],
    schedules: [],
    coaches: [],
    
    schedule_id: 0,
    isCoachesView: false,
    today: 0,

    setSchedules: (schedules: Schedule[]) => {
        set({ schedules,
            schedule_id: 0,
            days: getScheduleDays(schedules)
        });

    },

    selectSchedule: (schedule_id: number) => set({schedule_id}),

    selectNewCoach: (campId: number, coach_id: number) => {
        set({isCoachesView: false});
        const { schedule_id, camps, camp_id }: ScheduleSlice & CampsSlice = get();

        change_group_schedule_coach(schedule_id, {coach_id}, (res => {
            if (res.name.length > 0) {
                let coachName: string = res.name;

                if (campId !== camp_id) {
                    const camp = camps.find(el => el.id === campId)
                    if (camp) coachName = coachName + ' ('+ camp.name  + ')'
                }

                set((state: ScheduleSlice) => ({
                    schedules: state.schedules.map(el => el.id === schedule_id ? {...el, coach: coachName} : el)
                }));
            }
        }));
    },

    setToday: (today: number) => set({today}),
});


function getScheduleDays(schedules: Schedule[]): {day: number, weekday: string}[] {
    let currentDay: number = 0;
    let days: {day: number, weekday: string}[]=[];

    for (let schedule of schedules) {
        const day = schedule.weekday;

        if (schedule.weekday !== currentDay) {
            days.push({day, weekday: weekDays[day - 1]});
            currentDay = day;
        }
    }
    return days
};