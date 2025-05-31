import { httpWrapper } from '../../shared/http/httpWrapper';
import { api } from '../../api/api';
import { Metric, Camp } from './model';


  // Get
  export function get_metrics(callback: (metrics: Metric[]) => void) {
    return httpWrapper(() => api.get(`settings/metrics/all`), callback);
  };

  export function get_camps(callback: (camps: Camp[]) => void) {
    return httpWrapper(() => api.get(`camps`), callback, 'Getting camps');
  };

  // Add (Called once to create initial records)
  export function add_initial_metrics( data: {test: string, camp_id: number}, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.post(`settings/metrics/initial`, data), callback);
  };

  // Update
  export function update_metric(metric_id: number, data: Partial<Metric>, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.put(`settings/metrics/${metric_id}`, data), callback);
  };

  // Delete
  export function delete_all_metric(callback: (res:{isOk: boolean}) => void) {
    return httpWrapper(() => api.delete(`settings/metrics/all`), callback);
  };



