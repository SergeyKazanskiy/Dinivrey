import { httpWrapper } from '../../../shared/http/httpWrapper';
import { api } from '../../../api/manager_api';
import { Group, Coach, CoachShort} from './model';


// Get
export function get_coaches(callback: (camps: CoachShort[]) => void) {
  return httpWrapper(() => api.get(`coaches`), callback, 'Getting coaches');
};

export function get_coach(coach_id: number, callback: (coach: Coach) => void) {
  return httpWrapper(() => api.get(`coaches?coach_id=${coach_id}`), callback, 'Getting coache');
};

// Update
export function update_coach(coach_id: number, data: Partial<Coach>, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.put(`coaches/${coach_id}`, data), callback);
};