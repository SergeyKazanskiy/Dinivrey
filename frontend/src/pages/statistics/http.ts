import { httpWrapper } from '../../shared/http/httpWrapper';
import { api } from '../../api/api';
import { Camp, Lider, Test, CampTest, GroupTest, Achieve, GroupAchieve, Honored, Group } from './model';
import { objectToJson } from '../../shared/utils';


// Get
export function get_camps(callback: (camps: Camp[]) => void) {
  return httpWrapper(() => api.get(`camps/`), callback);
};

export function get_groups(camp_id: number, callback: (groups: Group[]) => void) {
  return httpWrapper(() => api.get(`camps/${camp_id}/groups`), callback);
};

export function get_camp_last_statistics(camp_id: number, callback: (test: CampTest) => void) {
  return httpWrapper(() => api.get(`camps/${camp_id}/statistics/last`), callback);
};

export function get_camp_groups_tests(camp_id: number, year: number, month: number, callback: (tests: GroupTest[]) => void) {
  return httpWrapper(() => api.get(`camps/${camp_id}/groups/tests?year=${year}&month=${month}`), callback);
};

export function get_camp_liders(camp_id: number, test_name: string, callback: (liders: Lider[]) => void) {
  return httpWrapper(() => api.get(`camps/${camp_id}/statistics/liders?test_name=${test_name}`), callback);
};

// Achieves
export function get_camp_achieves(camp_id: number, callback: (achieves: Achieve[]) => void) {
  return httpWrapper(() => api.get(`camps/${camp_id}/statistics/achieves`), callback);
};

export function get_groups_achieve_count(camp_id: number, achieve_id: number, callback: (groupAchieves: GroupAchieve[]) => void) {
  return httpWrapper(() => api.get(`camps/${camp_id}/groups/achieves/count?achieve_id=${achieve_id}`), callback);
};

export function get_groups_honores(group_id: number, achieve_id: number, callback: (honores: Honored[]) => void) {
  return httpWrapper(() => api.get(`camps/groups/${group_id}/honores?achieve_id=${achieve_id}`), callback);
};

// export function get_groups(camp_id: number, callback: (groups: Group[]) => void) {
//   return httpWrapper(() => api.get(`camps/${camp_id}/groups`), callback);
// };

// export function get_student_attendance(student_id: number, callback: (attendance: Attendance) => void) {
//   return httpWrapper(() => api.get(`students/${student_id}/attendance`), callback);
// };

// export function get_student_tests(student_id: number, year: number, month: number, callback: (tests: Test[]) => void) {
//   return httpWrapper(() => api.get(`students/${student_id}/tests?year=${year}&month=${month}`), callback);
// };

// export function get_student_games(student_id: number, year: number, month: number, callback: (games: Game[]) => void) {
//   return httpWrapper(() => api.get(`students/${student_id}/games?year=${year}&month=${month}`), callback);
// };

// export function get_achieves(category: string, callback: (achieves: Achieve[]) => void) {
//   return httpWrapper(() => api.get(`achieves?category=${category}`), callback);
// };

