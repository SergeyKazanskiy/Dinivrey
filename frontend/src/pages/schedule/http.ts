import { httpWrapper } from '../../shared/http/httpWrapper';
import { api } from '../../api/api';
import { Camp, Schedule, CoachShort,  } from './model';


// Get
export function get_camps(callback: (camps: Camp[]) => void) {
  return httpWrapper(() => api.get(`camps`), callback, 'Getting camps');
};

export function get_camp_schedule(camp_id: number, callback: (schedules: Schedule[]) => void) {
  return httpWrapper(() => api.get(`camps/${camp_id}/schedule`), callback);
};

export function get_coaches(camp_id: number, callback: (coaches: CoachShort[]) => void) {
  return httpWrapper(() => api.get(`camps/${camp_id}/coaches`), callback, 'Getting coaches');
};

// Update
export function change_group_schedule_coach(id: number, data: {coach_id: number}, callback: (res: {name: string}) => void) {
  return httpWrapper(() => api.put(`camps/groups/schedule/${id}`, data), callback, 'Change group schedule coach');
};




