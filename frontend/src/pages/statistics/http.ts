import { httpWrapper } from '../../shared/http/httpWrapper';
import { api } from '../../api/api';
import { Camp, Group, Test, Game, Achieve, Attendance } from './model';
import { objectToJson } from '../../shared/utils';


// Get
export function get_camps(callback: (camps: Camp[]) => void) {
  return httpWrapper(() => api.get(`camps/`), callback);
};

export function get_groups(camp_id: number, callback: (groups: Group[]) => void) {
  return httpWrapper(() => api.get(`camps/${camp_id}/groups`), callback);
};

export function get_student_attendance(student_id: number, callback: (attendance: Attendance) => void) {
  return httpWrapper(() => api.get(`students/${student_id}/attendance`), callback);
};

export function get_student_tests(student_id: number, year: number, month: number, callback: (tests: Test[]) => void) {
  return httpWrapper(() => api.get(`students/${student_id}/tests?year=${year}&month=${month}`), callback);
};

export function get_student_games(student_id: number, year: number, month: number, callback: (games: Game[]) => void) {
  return httpWrapper(() => api.get(`students/${student_id}/games?year=${year}&month=${month}`), callback);
};

export function get_achieves(category: string, callback: (achieves: Achieve[]) => void) {
  return httpWrapper(() => api.get(`achieves?category=${category}`), callback);
};

