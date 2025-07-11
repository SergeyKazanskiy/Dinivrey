import { Schedule } from "../model";
import { objectToJson } from "../../../shared/utils";
import { weekDays } from '../../../shared/constants';
import { CampsSlice } from './CampsSlice';


export interface SchedulesSlice {
    schedules: Schedule[];

    setSchedules: (schedules: Schedule[]) => void;
}

export const createSchedulesSlice = (set: any, get: any): SchedulesSlice => ({     
    schedules: [],

    setSchedules: (schedules: Schedule[]) =>  set({ schedules})
});
