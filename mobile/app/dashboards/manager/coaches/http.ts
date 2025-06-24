import { httpWrapper } from '../../../shared/http/httpWrapper';
import { api } from '../../../api/manager_api';
import { Group, Coach, CoachShort, CoachGroup, FreeGroup} from './model';


// Get get_coache_groups
export function get_coaches(camp_id: number, callback: (coaches: CoachShort[]) => void) {
  return httpWrapper(() => api.get(`camps/${camp_id}/coaches`), callback, 'Getting coaches');
};

export function get_coach(coach_id: number, callback: (coach: Coach) => void) {
  return httpWrapper(() => api.get(`camps/coaches/${coach_id}`), callback, 'Getting coache');
};

export function get_coache_groups(coach_id: number, callback: (coachGroups: CoachGroup[]) => void) {
  return httpWrapper(() => api.get(`camps/coaches/${coach_id}/groups`), callback, 'Getting coache groups');
};

export function get_free_groups(callback: (freeGroup: FreeGroup[]) => void) {
  return httpWrapper(() => api.get(`groups/free`), callback, 'Getting groups without coach');
};

// Add
export function add_coach_group(data: {coache_id: number, group_id: number}, callback: (coachGroups: CoachGroup[]) => void) {
    return httpWrapper(() => api.post(`camps/coaches/groups`, data), callback);
};

// Update
export function update_coach(coach_id: number, data: Partial<Coach>, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.put(`camps/coaches/${coach_id}`, data), callback);
};

// Delete
export function remove_coach_group(id: number, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.delete(`camps/coaches/groups/${id}`), callback);
};