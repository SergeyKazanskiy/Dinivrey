import { Camp, Group, Schedule } from '../model';
import { CoachShort } from '../../coaches/model';
import { GroupsSlice } from '../GroupsScreen/state';
import { update_group, delete_group, get_group_coach, change_group_coach } from '../http';
import { get_group_schedule, create_group_schedule, delete_group_schedule, update_group_schedule } from '../http';
import { get_coaches } from '../../coaches/http';
import { objectToJson, getChanges } from '@/app/shared/utils';
import { weekDays } from '../../../../shared/constants';


export interface GroupSlice {
  group: Group;
  isDeleteGroupAlert: boolean;

  coaches: CoachShort[];
  coach_id: number;
  coach_inx: number;

  schedules: Schedule[];
  schedule_id: number;
  isTimeMenu: boolean;

  weekday: number;
  hour: number;
  minute: number;

  isAchievesScreen: boolean;
  isStatisticsScreen: boolean;

  setGroup: (group: Group) => void;

  loadCoaches: (camp_id: number) => void;
  loadGroupCoache: (group_id: number) => void;
  loadSchedule: (group_id: number) => void;

  selectCoache: (coach_inx: number) => void;
  updateGroup: (name: string, description: string) => void;
  deleteGroup: (group_id: number)=> void;

  showDeleteGroupAlert: () => void;
  hideDeleteGroupAlert: () => void;

  //Schedules
  setSchedules: (schedules: Schedule[]) => void;
  selectSchedule: (id: number, weekday: number) => void;

  showTimeMenu: () => void;
  hideTimeMenu: () => void;

  setDay: (weekday: number) => void;
  setTime: (h: number, m: number) => void;

  createSchedule: () => void;
  deleteSchedule: () => void;

  //Reports
  showAchievesScreen: () => void;
  hideAchievesScreen: () => void;

  showStatisticsScreen: () => void;
  hideStatisticsScreen: () => void;
}

export const createGroupSlice = (set: any, get: any): GroupSlice => ({
  group: {id: 0, camp_id: 0, name: ''},
  isDeleteGroupAlert: false,

  coaches: [],
  coach_id: 0,
  coach_inx: -1,

  schedules: [],
  schedule_id: 0,
  isTimeMenu: false,

  weekday: 0,
  hour: 0,
  minute: 0,

  isAchievesScreen: false,
  isStatisticsScreen: false,

  setGroup: (group: Group) => {
      set({ group });
  },

  loadCoaches: (camp_id: number) => { 
    get_coaches(camp_id, (coaches => {
      set({coaches});
      
      const { loadGroupCoache, group_id }: GroupSlice & GroupsSlice = get();
      loadGroupCoache(group_id);
    }));
  },

  loadGroupCoache: (group_id: number) => {
    get_group_coach(group_id, (res => {
      if (res) {
        //alert(objectToJson(res))
        if (res.id > 0) {
          const { coaches }: GroupSlice = get();
          const coach_inx = coaches.findIndex(el => el.id === res.id);

          set({coach_id: res.id, coach_inx});
        } else {
           set({coach_id: 0, coach_inx: -1});
        }
      }
    }));
  },

  loadSchedule: (group_id: number) => {
    get_group_schedule(group_id, (schedules: Schedule[]) => {
        const { setSchedules }: GroupSlice = get();
        setSchedules(schedules);
    })
  },

  selectCoache: (coach_inx: number) => {
    const { group_id, coaches }: GroupsSlice & GroupSlice = get();
    const coach_id = coaches[coach_inx].id;
    
    change_group_coach(group_id, {coach_id}, (res => {
      if (res.isOk) {
        set({coach_id, coach_inx});
      }
    }));
  },

  updateGroup: (name: string, description: string) => {
    const { camp_id, group_id, groups }: GroupsSlice = get();
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

  deleteGroup: (group_id: number) => {
    delete_group(group_id, (res => {
      if (res.isOk) {
        // set((state: GroupsSlice) => ({
        //   group_id: 0, isDeleteGroupAlert: false,
        //   groups: state.groups.filter(el => el.id !== group_id),
        // }));
      }
    }));
  },

  showDeleteGroupAlert: () => set({isDeleteGroupAlert: true}),
  hideDeleteGroupAlert: () => set({isDeleteGroupAlert: false}),

  setSchedules: (schedules: Schedule[]) => set({ schedules, schedule_id: 0 }),
  
  selectSchedule: (id: number, inx: number) => {
      const { weekday }: GroupSlice = get();
      //alert(id)
      if (inx + 1 === weekday) {
          set({ schedule_id: 0, weekday: 0 });
      } else {
          set({ schedule_id: id, weekday: inx + 1 });
          const { schedules }: GroupSlice = get();
          const schedule = schedules.find(el => el.weekday === inx + 1)
          if (schedule) {
              set({hour: schedule.hour, minute: schedule.minute})
          }
      }
  },

  showTimeMenu: () => set({isTimeMenu: true}),
  hideTimeMenu: () => set({isTimeMenu: false}),

  setDay: (weekday: number) => set({ weekday }),

  setTime: (h: number, m: number) => {
      const { schedule_id, hour, minute, schedules, updateGroup, groups, groupInx }: GroupSlice & GroupsSlice= get();
     
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
      const { group_id, weekday, updateGroup, groups, groupInx, coach_id }: GroupSlice & GroupsSlice = get();
      const hour = 16; const minute = 0;
      const schedule: Omit<Schedule, 'id'> = { group_id, weekday, hour, minute, coach_id }
      
      create_group_schedule(schedule, (res)=> {
          if (res) {
              const newShedule: Schedule = {id: res.id, group_id, weekday, hour, minute, coach_id }
              
              set((state: GroupSlice) => ({
                  schedules: [...state.schedules, newShedule],
                  schedule_id: res.id,
              }));
              const desc = weekDays[weekday - 1] + ' ' + hour + ' : 00'
              updateGroup(groups[groupInx].name, desc);
          }
      })
  },

  deleteSchedule: () => {
      const { schedule_id, updateGroup, groups, groupInx, schedules }: GroupSlice & GroupsSlice = get();

      delete_group_schedule(schedule_id, (res) => {
          if (res.isOk) {
              set((state: GroupSlice) => ({
                  schedules: state.schedules.filter(el => el.id !== schedule_id),
                  schedule_id: 0
              }));
              const desc = getDescription(schedules);
              updateGroup(groups[groupInx].name, desc);
          };
      });
  },

  showAchievesScreen: () => set({isAchievesScreen: true}),
  hideAchievesScreen: () => set({isAchievesScreen: false}),

  showStatisticsScreen: () => set({isStatisticsScreen: true}),
  hideStatisticsScreen: () => set({isStatisticsScreen: false}),
});

function getDescription(schedules: Schedule[]): string {
    const dates = schedules.map(el => ' ' +  weekDays[el.weekday - 1] + ' ' + el.hour + ':' + el.minute)
    return dates.toString()
}