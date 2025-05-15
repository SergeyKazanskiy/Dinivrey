import { httpWrapper } from '../../../shared/http/httpWrapper';
import { api } from '../../../api/coach_api';
import { Group, Lider, Student, Test, Game, Achievement, Achieve, Attendance, Parent, AchieveAttach } from './model';


// Groups
export function get_groups(coach_id: number, callback: (camps: Group[]) => void) {
  return httpWrapper(() => api.get(`camps/groups?coach_id=${coach_id}`), callback, 'Getting coach groups');
};

export function get_students(group_id: number, callback: (students: Student[]) => void) {
  return httpWrapper(() => api.get(`camps/groups/${group_id}/students/`), callback, 'Getting students');
};

export function get_liders(group_id: number, callback: (liders: Lider[]) => void) { //???
  return httpWrapper(() => api.get(`camps/groups/${group_id}/liders/`), callback, 'Getting liders');
};


// Profile
export function get_student(id: number, callback: (student: Student) => void) {
  return httpWrapper(() => api.get(`students/${id}`), callback);
};

export function get_student_parents(student_id: number, callback: (parents: Parent[]) => void) {
  return httpWrapper(() => api.get(`students/${student_id}/parents`), callback);
};

export function get_student_attendance(student_id: number, callback: (attendance: Attendance) => void) {
  return httpWrapper(() => api.get(`students/${student_id}/attendance`), callback);
};


// Statistics
export function get_last_test_date(student_id: number, callback: (res: {year: number, month: number, isEvents: boolean}) => void) {
  return httpWrapper(() => api.get(`students/${student_id}/tests/last/date`), callback);
};

export function get_last_game_date(student_id: number, callback: (res: {year: number, month: number, isEvents: boolean}) => void) {
  return httpWrapper(() => api.get(`students/${student_id}/games/last/date`), callback);
};

export function get_student_tests(student_id: number, year: number, month: number, callback: (tests: Test[]) => void) {
  return httpWrapper(() => api.get(`students/${student_id}/tests?year=${year}&month=${month}`), callback);
};

export function get_student_games(student_id: number, year: number, month: number, callback: (games: Game[]) => void) {
  return httpWrapper(() => api.get(`students/${student_id}/games?year=${year}&month=${month}`), callback);
};


// Achievements
export function get_student_achieves(student_id: number, callback: (achieves: Achievement[]) => void) {
  return httpWrapper(() => api.get(`students/${student_id}/achievements`), callback);
};

export function get_base_achieves(category: string, callback: (achieves: Achieve[]) => void) {
  return httpWrapper(() => api.get(`achieves?category=${category}`), callback);
};

export function attach_student_achieve(data: AchieveAttach, callback: (achievement: Achievement) => void) {
  return httpWrapper(() => api.post(`students/achievements`, data), callback);
};

export function detach_student_achieve(achieve_id: number, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.delete(`students/achievements/${achieve_id}`), callback);
};

// Summary
export function update_student_tests_summary(student_id: number, data: {summary: string}, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.put(`students/${student_id}/tests/summary`, data), callback);
};

export function update_student_achieves_summary(student_id: number,  data: {summary: string}, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.put(`students/${student_id}/achievements/summary`, data), callback);
};