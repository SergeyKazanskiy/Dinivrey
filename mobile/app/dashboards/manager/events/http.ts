import { httpWrapper } from '../../../shared/http/httpWrapper';
import { api } from '../../../api/manager_api';
import { Camp, Group, Event, Attendance, CoachShort, Schedule, ShortDrill} from './model';


// Get
  export function get_camps(callback: (camps: Camp[]) => void) {
    return httpWrapper(() => api.get(`camps`), callback);
  };
  
  export function get_camp_groups(camp_id: number, callback: (groups: Group[]) => void) {
    return httpWrapper(() => api.get(`camps/${camp_id}/groups`), callback);
  };

  export function get_camp_schedule(camp_id: number, callback: (schedules: Schedule[]) => void) {
    return httpWrapper(() => api.get(`camps/${camp_id}/schedule`), callback);
  };

  export function get_camp_events(camp_id: number, year: number, month: number, callback: (events: Event[]) => void) {
    return httpWrapper(() => api.get(`camps/${camp_id}/events?year=${year}&month=${month}`), callback);
  };

  export function get_all_coaches(callback: (camps: CoachShort[]) => void) {
    return httpWrapper(() => api.get(`coaches/short`), callback);
  };

  export function get_event_drills(event_id: number, callback: (drills: ShortDrill[]) => void) {
      return httpWrapper(() => api.get(`camps/events/${event_id}/drills`), callback);
  };

  export function get_attendances(event_id: number, group_id: number, callback: (attendances: Attendance[]) => void) {
    return httpWrapper(() => api.get(`camps/events/${event_id}/groups/${group_id}/attendances`), callback);
  };


  // Add
  export function add_event(data: Omit<Event, 'id'>, callback: (res:{id: number}) => void) {
    return httpWrapper(() => api.post(`camps/events`, data), callback);
  };


  // Update
  export function update_event(event_id: number, data: Partial<Event>, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.put(`camps/events/${event_id}`, data), callback);
  };

  export function change_group_schedule_coach(id: number, data: {coach_id: number}, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.put(`camps/groups/schedule/${id}`, data), callback);
  };
  
  // Delete
  export function delete_event(event_id: number, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.delete(`camps/events/${event_id}`), callback);
  };


