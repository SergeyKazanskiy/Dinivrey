import { httpWrapper } from '../../shared/http/httpWrapper';
import { api } from '../../api/api';
import { Student, Camp, Group, Parent, Attendance, TestGame } from './model';
import { Test, Game, Achieve, AchieveAttach, Achievement, TestUpdate } from './model';
import { objectToJson } from '../../shared/utils';


// Get
export function get_student(id: number, callback: (student: Student) => void) {
  return httpWrapper(() => api.get(`students/${id}`), callback);
};

export function get_camps(callback: (camps: Camp[]) => void) {
  return httpWrapper(() => api.get(`camps/`), callback);
};

export function get_groups(camp_id: number, callback: (groups: Group[]) => void) {
  return httpWrapper(() => api.get(`camps/${camp_id}/groups`), callback);
};

export function get_student_parents(student_id: number, callback: (parents: Parent[]) => void) {
  return httpWrapper(() => api.get(`students/${student_id}/parents`), callback);
};

export function get_student_attendance_percent(student_id: number, callback: (attendance: Attendance) => void) {
  return httpWrapper(() => api.get(`students/${student_id}/attendances/percent`), callback);
};

export function get_last_test_date(student_id: number, callback: (res: {year: number, month: number, isEvents: boolean}) => void) {
  return httpWrapper(() => api.get(`students/${student_id}/tests/last/date`), callback);
};

export function get_student_tests(student_id: number, year: number, month: number, callback: (tests: Test[]) => void) {
  return httpWrapper(() => api.get(`students/${student_id}/tests?year=${year}&month=${month}`), callback);
};

export function get_student_games(student_id: number, year: number, month: number, callback: (games: Game[]) => void) {
  return httpWrapper(() => api.get(`students/${student_id}/games?year=${year}&month=${month}`), callback);
};

export function get_test_games(callback: (games: TestGame[]) => void) {
  return httpWrapper(() => api.get(`students/tests/games`), callback);
};

export function get_student_achieves(student_id: number, callback: (achieves: Achievement[]) => void) {
  return httpWrapper(() => api.get(`students/${student_id}/achievements`), callback);
  //return httpWrapper(() => api.get(`students/${student_id}/achievements`), callback);
};

export function get_base_achieves(category: string, trigger: string, callback: (achieves: Achieve[]) => void) {
  return httpWrapper(() => api.get(`achieves?category=${category}&trigger=${trigger}`), callback);
};

export function get_notifications_count(student_id: number, callback: (count: number) => void) {
  return httpWrapper(() => api.get(`students/${student_id}/notifications/count`), callback);
};

export function get_notifications(student_id: number, callback: (notifications: string[]) => void) {
  return httpWrapper(() => api.get(`students/${student_id}/notifications`), callback);
};


// Update
export function update_student(student_id: number, data: Partial<Student>, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.put(`students/${student_id}`, data), callback);
};

export function update_student_parents(data: Parent[], callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.put(`students/parents/0`, data), callback);
};

export function update_student_group(student_id: number, data: Group, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.put(`students/${student_id}/group`, data), callback);
};

export function update_student_test(student_id: number, test_id: number, data: TestUpdate,
  callback: (res: {"score": number, 'time'?: number, 'achievements': object}) => void) {
  //alert(objectToJson(data))
  return httpWrapper(() => api.put(`students/${student_id}/tests/${test_id}`, data), callback);
};

export function update_test_game(student_id: number, game_id: number, data: Partial<TestGame>,
    callback: (res: {isOk: boolean, achievements: object}) => void) {
  return httpWrapper(() => api.put(`students/${student_id}/games/${game_id}`, data), callback);
};

export function update_student_achieve(id: number, data: Partial<Achievement>, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.put(`students/achievements/${id}`, data), callback);
};

// Add
export function add_test(data: Omit<Test, 'id'>, callback: (res: {id: number}) => void) {
  return httpWrapper(() => api.post(`students/tests`, data), callback);
};

export function add_game(data: Omit<TestGame, 'id'>, callback: (res: {id: number}) => void) { //!!! only for test
  return httpWrapper(() => api.post(`students/games`, data), callback);
};

export function attach_achieve(data: AchieveAttach, callback: (achievement: Achievement) => void) {
  return httpWrapper(() => api.post(`students/achievements`, data), callback);
};

// Photo
export function add_student_photo(student_id: number, formData: FormData, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.post(`students/${student_id}/photo`, formData,
      { headers: {'Content-Type': 'multipart/form-data'}}), callback);
};

// Delete
export function delete_student(id: number, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.delete(`students/${id}`), callback);
};

export function delete_student_test(id: number, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.delete(`students/tests/${id}`), callback);
};

export function delete_student_game(id: number, callback: (res: {isOk: boolean}) => void) {
  //alert(id)
  return httpWrapper(() => api.delete(`students/games/${id}`), callback);
};

export function detach_student_achieve(achieve_id: number, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.delete(`students/achievements/${achieve_id}`), callback);
};

export function delete_notifications(student_id: number, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.delete(`students/${student_id}/notifications`), callback);
};