import { httpWrapper } from '../../shared/http/httpWrapper';
import { api } from '../../api/api';
import { Camp, Group, Schedule, Lider, Student } from './model';
import { Parent } from '../student/model';

// Get
export function get_camps(callback: (camps: Camp[]) => void) {
  return httpWrapper(() => api.get(`camps`), callback, 'Getting camps');
};

export function get_groups(camp_id: number, callback: (camps: Group[]) => void) {
  return httpWrapper(() => api.get(`camps/${camp_id}/groups/schedule`), callback, 'Getting groups');
};

export function get_group_schedule(group_id: number, callback: (schedules: Schedule[]) => void) {
  return httpWrapper(() => api.get(`camps/groups/${group_id}/schedule`), callback, 'Getting schedule');
};

export function get_students(group_id: number, callback: (students: Student[]) => void) {
  return httpWrapper(() => api.get(`camps/groups/${group_id}/students/`), callback, 'Getting students');
};

export function get_liders(group_id: number, callback: (liders: Lider[]) => void) {
  return httpWrapper(() => api.get(`camps/groups/${group_id}/liders/`), callback, 'Getting liders');
};

// Create
export function create_camp(data: Omit<Camp, 'id'>, callback: (res: {id: number}) => void) {
  return httpWrapper(() => api.post(`camps/`, data), callback);
};

export function create_group(data: Omit<Group, 'id'>, callback: (res: {id: number}) => void) {
  return httpWrapper(() => api.post(`camps/groups`, data), callback);
};

export function create_group_schedule(data: Omit<Schedule, 'id'>, callback: (res: {id: number}) => void) {
  return httpWrapper(() => api.post(`camps/groups/schedule`, data), callback);
};

export function create_student(data: Omit<Student, 'id'>, callback: (res: {id: number}) => void) {
  return httpWrapper(() => api.post(`camps/groups/students`, data), callback);
};

export function create_student_parents(data: Omit<Parent, 'id'>[], callback: (res: number[]) => void) {
  return httpWrapper(() => api.post(`students/parents`, data), callback);
};

//Update
export function update_camp(camp_id: number, data: Partial<Camp>, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.put(`camps/${camp_id}`, data), callback);
};

export function update_group(group_id: number, data: Partial<Group>, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.put(`camps/groups/${group_id}`, data), callback);
};

export function update_group_schedule(schedule_id: number, data: Partial<Schedule>, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.put(`camps/groups/schedule/${schedule_id}`, data), callback);
};

//Delete
export function delete_camp(id: number, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.delete(`camps/${id}`), callback);
};

export function delete_group(id: number, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.delete(`camps/groups/${id}`), callback);
};

export function delete_group_schedule(id: number, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.delete(`camps/groups/schedule/${id}`), callback);
};

export function delete_student(id: number, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.delete(`camps/groups/students/${id}`), callback);
};