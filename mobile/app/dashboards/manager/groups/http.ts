import { httpWrapper } from '../../../shared/http/httpWrapper';
import { api } from '../../../api/manager_api';
import { Camp, Group, Lider, Student, Test, Game, Achievement, Schedule } from './model';
import { Achieve, Attendance, Parent, AchieveAttach, Comment } from './model';


// Groups
export function get_camps(callback: (camps: Camp[]) => void) {
  return httpWrapper(() => api.get(`camps`), callback);
};

export function get_groups(camp_id: number, callback: (camps: Group[]) => void) {
  return httpWrapper(() => api.get(`camps/${camp_id}/groups`), callback, 'Getting camp groups');
};

export function get_students(group_id: number, callback: (students: Student[]) => void) {
  return httpWrapper(() => api.get(`camps/groups/${group_id}/students/`), callback, 'Getting students');
};

export function get_liders(group_id: number, callback: (liders: Lider[]) => void) { //???
  return httpWrapper(() => api.get(`camps/groups/${group_id}/liders/`), callback, 'Getting liders');
};

export function create_group(data: Omit<Group, 'id'>, callback: (res: {id: number}) => void) {
    return httpWrapper(() => api.post(`camps/groups`, data), callback);
};

export function update_group(group_id: number, data: Partial<Group>, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.put(`camps/groups/${group_id}`, data), callback);
};

export function delete_group(id: number, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.delete(`camps/groups/${id}`), callback);
};

// Coach
export function get_group_coach(group_id: number, callback: (res: {id: number}) => void) {
  return httpWrapper(() => api.get(`camps/groups/${group_id}/coach`), callback, 'Getting group coach');
};

export function change_group_coach(group_id: number, data: {coach_id: number}, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.put(`camps/groups/${group_id}/new_coach`, data), callback);
};


// Schedule
export function get_group_schedule(group_id: number, callback: (schedules: Schedule[]) => void) {
  return httpWrapper(() => api.get(`camps/groups/${group_id}/schedule`), callback, 'Getting schedule');
};

export function create_group_schedule(data: Omit<Schedule, 'id'>, callback: (res: {id: number}) => void) {
  return httpWrapper(() => api.post(`camps/groups/schedule`, data), callback);
};

export function update_group_schedule(schedule_id: number, data: Partial<Schedule>, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.put(`camps/groups/schedule/${schedule_id}`, data), callback);
};

export function delete_group_schedule(id: number, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.delete(`camps/groups/schedule/${id}`), callback);
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

export function get_student_coach_comments(student_id: number, callback: (comments: Comment[]) => void) {
  return httpWrapper(() => api.get(`students/${student_id}/coach/comments`), callback);
};

export function get_last_test(student_id: number, callback: (tests: Test[]) => void) {
    return httpWrapper(() => api.get(`students/${student_id}/tests/last`), callback);
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

export function get_base_achieves(category: string, trigger: string, callback: (achieves: Achieve[]) => void) {
  return httpWrapper(() => api.get(`achieves?category=${category}&trigger=${trigger}`), callback);
};

export function attach_student_achieve(data: AchieveAttach, callback: (achievement: Achievement) => void) {
  return httpWrapper(() => api.post(`students/achievements`, data), callback);
};

export function detach_student_achieve(achieve_id: number, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.delete(`students/achievements/${achieve_id}`), callback);
};

// Summary
export function update_student_tests_summary(student_id: number, data: {summary_tests: string}, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.put(`students/${student_id}/tests/summary`, data), callback);
};

export function update_student_achieves_summary(student_id: number,  data: {summary_achievements: string}, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.put(`students/${student_id}/achievements/summary`, data), callback);
};

export function update_student_games_summary(student_id: number,  data: {summary_games: string}, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.put(`students/${student_id}/games/summary`, data), callback);
};