import { httpWrapper } from '../../shared/http/httpWrapper';
import { api } from '../../api/api';
import { Camp, Group, Event, Student, Attendance } from './model';
import { objectToJson } from '../../shared/utils';


  // Get
  export function get_camps(callback: (camps: Camp[]) => void) {
    return httpWrapper(() => api.get(`camps`), callback);
  };
  
  export function get_groups(camp_id: number, callback: (groups: Group[]) => void) {
    return httpWrapper(() => api.get(`camps/${camp_id}/groups`), callback);
  };
  
  export function get_last_event(camp_id: number, callback: (res: {year: number, month: number, isEvents: boolean}) => void) {
    return httpWrapper(() => api.get(`camps/${camp_id}/events/latest`), callback);
  };

  export function get_events(camp_id: number, year: number, month: number, callback: (events: Event[]) => void) {
    return httpWrapper(() => api.get(`camps/${camp_id}/events?year=${year}&month=${month}`), callback);
  };

  export function get_attendances(event_id: number, group_id: number, callback: (attendances: Attendance[]) => void) {
    return httpWrapper(() => api.get(`camps/events/${event_id}/groups/${group_id}/attendances`), callback);
  };

  export function get_students_names(group_id: number, callback: (students: Student[]) => void) {
    return httpWrapper(() => api.get(`camps/groups/${group_id}/students/names`), callback);
  };

  // Add
  export function add_event(data: Omit<Event, 'id'>, callback: (res:{id: number}) => void) {
    return httpWrapper(() => api.post(`camps/events`, data), callback);
  };

  export function add_attendances(data: {event_id: number, group_id: number}, callback: (res:{isOk: boolean}) => void) {
    return httpWrapper(() => api.post(`camps/events/attendances`, data), callback);
  };

  // Update
  export function update_event(event_id: number, data: Partial<Event>, callback: (res: {isOk: boolean}) => void) {
    //alert(objectToJson(data));
    return httpWrapper(() => api.put(`camps/events/${event_id}`, data), callback);
  };

  export function update_attendance(attendance_id: number, data: {present: boolean}, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.put(`camps/events/attendances/${attendance_id}`, data), callback);
  };


  // Delete
  export function delete_event(event_id: number, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.delete(`camps/events/${event_id}`), callback);
  };

  export function delete_attendances(event_id: number, group_id: number, callback: (res:{isOk: boolean}) => void) {
    return httpWrapper(() => api.delete(`camps/events/${event_id}/groups/${group_id}`), callback);
  };

