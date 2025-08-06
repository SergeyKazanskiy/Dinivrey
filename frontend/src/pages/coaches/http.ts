import { httpWrapper } from '../../shared/http/httpWrapper';
import { api } from '../../api/api';
import { Camp, Coach, FreeGroup, CoachGroup, Schedule, Event, Manager } from './model';


// Get
export function get_camps(callback: (camps: Camp[]) => void) {
  return httpWrapper(() => api.get(`camps`), callback);
};

export function get_camp_coaches(camp_id: number, callback: (coaches: Coach[]) => void) {
  return httpWrapper(() => api.get(`camps/${camp_id}/coaches`), callback);
};

export function get_coaches_groups(camp_id: number, callback: (coachGroups: CoachGroup[]) => void) {
  return httpWrapper(() => api.get(`camps/${camp_id}/coaches/groups`), callback, 'Getting coache groups');
};

export function get_free_groups(callback: (freeGroup: FreeGroup[]) => void) {
  return httpWrapper(() => api.get(`groups/free`), callback, 'Getting groups without coach');
};

export function get_schedules(camp_id: number, callback: (schedules: Schedule[]) => void) {
  return httpWrapper(() => api.get(`camps/${camp_id}/coaches/schedules`), callback);
};

export function get_last_event(camp_id: number, callback: (res: {year: number, month: number, isEvents: boolean}) => void) {
  return httpWrapper(() => api.get(`camps/${camp_id}/events/latest`), callback);
};

export function get_competitions(camp_id: number, year: number, month: number, callback: (events: Event[]) => void) {
  return httpWrapper(() => api.get(`camps/${camp_id}/competitions?year=${year}&month=${month}`), callback);
};

// Add
export function create_manager(data: Omit<Manager, 'id'>, callback: (res: {id: number}) => void) {
    return httpWrapper(() => api.post(`camps/managers`, data), callback);
};

export function create_coach(data: Omit<Coach, 'id'>, callback: (res: {id: number}) => void) {
    return httpWrapper(() => api.post(`camps/coaches`, data), callback);
};

export function add_coach_group(data: {coache_id: number, group_id: number}, callback: (res: {id: number}) => void) {
    return httpWrapper(() => api.post(`camps/coaches/groups`, data), callback);
};

// Photo
export function add_coach_photo(coach_id: number, formData: FormData,
  callback: (res: {isOk: boolean, error_code: number, error_message: string}) => void) {

  return httpWrapper(() => api.post(`camps/coaches/${coach_id}/photo`, formData,
      { headers: {'Content-Type': 'multipart/form-data'}}), callback);
};

// Update
export function update_coach(coach_id: number, data: Partial<Coach>, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.put(`camps/coaches/${coach_id}`, data), callback);
};

export function update_manager(manager_id: number, data: Partial<Manager>, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.put(`camps/managers/${manager_id}`, data), callback);
};

// Delete
export function delete_manager(id: number, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.delete(`camps/managers/${id}`), callback);
};

export function delete_coach(id: number, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.delete(`camps/coaches/${id}`), callback);
};

export function remove_coach_group(id: number, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.delete(`camps/coaches/groups/${id}`), callback);
};

