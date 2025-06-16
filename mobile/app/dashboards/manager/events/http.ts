import { httpWrapper } from '../../../shared/http/httpWrapper';
import { api } from '../../../api/manager_api';
import { Camp, Group, Event, Attendance, GroupEvent} from './model';


// Get
  export function get_camps(callback: (camps: Camp[]) => void) {
    return httpWrapper(() => api.get(`camps`), callback);
  };
  
  export function get_groups(camp_id: number, callback: (groups: Group[]) => void) {
    return httpWrapper(() => api.get(`camps/${camp_id}/groups`), callback);
  };
  
  export function get_week_events(camp_id: number, year: number, month: number, week: number, callback: (events: Event[]) => void) {
    return httpWrapper(() => api.get(`camps/${camp_id}/events?year=${year}&month=${month}&week=${week}`), callback);
  };

  export function get_group_events(group_id: number, year: number, month: number, callback: (events: GroupEvent[]) => void) {
    return httpWrapper(() => api.get(`camps/groups/${group_id}/events?year=${year}&month=${month}`), callback);
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

  
  // Delete
  export function delete_event(event_id: number, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.delete(`camps/events/${event_id}`), callback);
  };


