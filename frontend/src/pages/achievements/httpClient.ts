import { httpWrapper } from '../../shared/http/httpWrapper';
import { api } from '../../api/api';
import { AchieveShort, Achieve, Rule } from './model';


// Get
export function get_achieves(callback: (achieves: AchieveShort[]) => void) {
  return httpWrapper(() => api.get(`achieves/all`), callback);
};

export function get_achieve(achieve_id: number, callback: (achieve: Achieve) => void) {
  return httpWrapper(() => api.get(`achieves/${achieve_id}`), callback);
};

export function get_rules(achieve_id: number, callback: (rules: Rule[]) => void) {
  return httpWrapper(() => api.get(`achieves/${achieve_id}/rules`), callback);
};

// Create
export function create_achieve(data: Achieve, callback: (res: {id: number}) => void) {
  return httpWrapper(() => api.post(`achieves`, data), callback);
};

export function add_rules(rules: Rule[], callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.post(`achieves/rules`, rules), callback);
};

// Update
export function update_achieve(id: number, data: Partial<Achieve>, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.put(`achieves/${id}`, data), callback);
};

export function replace_rules(achieve_id: number, rules: Rule[], callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.put(`achieves/rules/${achieve_id}`, rules), callback);
};

// Delete
export function delete_achieve(achieve_id: number, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.delete(`achieves/${achieve_id}`), callback);
};

export function delete_rule(rule_id: number, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.delete(`achieves/rules/${rule_id}`), callback);
};