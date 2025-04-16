import { httpWrapper } from '../../shared/http/httpWrapper';
import { api } from '../../api/api';
import { Camp, Group,  } from './model';


// Get
export function get_camps(callback: (camps: Camp[]) => void) {
  return httpWrapper(() => api.get(`camps`), callback);
};

export function get_groups(camp_id: number, callback: (camps: Group[]) => void) {
  return httpWrapper(() => api.get(`camps/${camp_id}/groups`), callback);
};
