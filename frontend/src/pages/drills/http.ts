import { httpWrapper } from '../../shared/http/httpWrapper';
import { api } from '../../api/api';
import { Drill, ShortDrill} from './model';
import { objectToJson } from '../../shared/utils';


  // Get
  export function get_drills(callback: (drills: ShortDrill[]) => void) {
    return httpWrapper(() => api.get(`drills/all`), callback);
  };

  export function get_drill(drill_id: number, callback: (drill: Drill) => void) {
    return httpWrapper(() => api.get(`drills/${drill_id}`), callback);
  };

  // Add
  export function add_drill(data: Omit<Drill, 'id'>, callback: (res:{id: number}) => void) {
    return httpWrapper(() => api.post(`drills`, data), callback);
  };

  // Update
  export function update_drill(drill_id: number, data: Partial<Drill>, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.put(`drills/${drill_id}`, data), callback);
  };

  // Delete
  export function delete_drill(drill_id: number, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.delete(`drills/${drill_id}`), callback);
  };


