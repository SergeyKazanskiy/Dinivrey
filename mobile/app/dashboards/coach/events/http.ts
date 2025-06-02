import { httpWrapper } from '../../../shared/http/httpWrapper';
import { api } from '../../../api/coach_api';
import { Attendance, Test, Game, Event, Tester, Student, Schedule, EventDrill, ShortDrill, Drill, TestUpdate } from './model';


// Events
export function get_coach_last_event(group_ids: number[], callback: (res: {year: number, month: number, week: number, isEvents: boolean}) => void) {
    const query = group_ids.map(id => `group_ids=${id}`).join("&");
    return httpWrapper(() => api.get(`camps/groups/events/latest?${query}`), callback);
};

export function get_coach_schedule(group_ids: number[], callback: (res: {schedules: Schedule[], events: Event[]}) => void) {
    const query = group_ids.map(id => `group_ids=${id}`).join("&");
    return httpWrapper(() => api.get(`/camps/groups/schedule?${query}`), callback);
};

export function get_coach_events(year: number, month: number, week: number, group_ids: number[], callback: (events: Event[]) => void) {
    const query = group_ids.map(id => `group_ids=${id}`).join("&");
    return httpWrapper(() => api.get(`camps/groups/events?year=${year}&month=${month}&week=${week}&${query}`), callback);
};

export function get_coach_competitions( group_ids: number[], callback: (events: Event[]) => void) {
    const query = group_ids.map(id => `group_ids=${id}`).join("&");
    return httpWrapper(() => api.get(`camps/groups/events/competitions?&${query}`), callback);
};


export function add_event(data: Omit<Event, 'id'>, callback: (res:{id: number}) => void) {
    return httpWrapper(() => api.post(`camps/events`, data), callback);
};

export function update_event(event_id: number, data: Partial<Event>, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.put(`camps/events/${event_id}`, data), callback);
};

// Attendance
export function get_attendances(event_id: number, group_id: number, callback: (attendances: Attendance[]) => void) {
    return httpWrapper(() => api.get(`camps/events/${event_id}/groups/${group_id}/attendances`), callback);
};

export function get_students_names(group_id: number, callback: (students: Student[]) => void) {
    return httpWrapper(() => api.get(`camps/groups/${group_id}/students/names`), callback);
};

export function add_attendances(data: {event_id: number, group_id: number}, callback: (res:{isOk: boolean}) => void) {
    return httpWrapper(() => api.post(`camps/events/attendances`, data), callback);
};

export function update_attendance(attendance_id: number, data: {present?: boolean, comment?: string}, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.put(`camps/events/attendances/${attendance_id}`, data), callback);
};

export function update_all_attendances(event_id: number, group_id: number, data: {present: boolean}, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.put(`camps/events/${event_id}/groups/${group_id}/attendances`, data), callback);
};

export function delete_attendances(event_id: number, group_id: number, callback: (res:{isOk: boolean}) => void) {
    return httpWrapper(() => api.delete(`camps/events/${event_id}/groups/${group_id}`), callback);
};


// Testing
export function get_testers(event_id: number, group_id: number, timestamp: number, callback: (testers: Tester[]) => void) {
    return httpWrapper(() => api.get(`camps/events/${event_id}/groups/${group_id}/testers?timestamp=${timestamp}`), callback, 'Getting testers');
};


export function add_all_present_students_new_tests(event_id: number, group_id: number, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.post(`camps/events/${event_id}/groups/${group_id}/tests`), callback);
};

export function add_student_test(data: Omit<Test, 'id'>, callback: (res: {id: number}) => void) {
    return httpWrapper(() => api.post(`students/tests`, data), callback);
};

export function delete_student_test(id: number, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.delete(`students/tests/${id}`), callback);
};

export function update_student_test(id: number, data: TestUpdate, callback: (res: {"score": number, 'time?': number}) => void) {
    return httpWrapper(() => api.put(`students/tests/${id}`, data), callback);
};


// Gaming
export function add_game(data: Omit<Game, 'id'>, callback: (res: {id: number}) => void) {
    return httpWrapper(() => api.post(`students/games`, data), callback);
};

export function update_student_game(id: number, data: Partial<Game>, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.put(`students/games/${id}`, data), callback);
};
  
export function delete_student_game(id: number, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.delete(`students/games/${id}`), callback);
};

// Event drills
export function get_event_drills(event_id: number, callback: (drills: ShortDrill[]) => void) {
    return httpWrapper(() => api.get(`camps/events/${event_id}/drills`), callback);
};

export function attach_drill(data: Omit<EventDrill, 'id'>, callback: (res:{id: number}) => void) {
    return httpWrapper(() => api.post(`camps/events/drills`, data), callback);
};

export function detach_drill(drill_id: number, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.delete(`camps/events/drills/${drill_id}`), callback);
};

export function update_event_drill(drill_id: number, data: Partial<EventDrill>, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.put(`camps/events/drills/${drill_id}`, data), callback);
};

// Drills
export function get_drills(callback: (drills: Omit<ShortDrill, 'present'>[]) => void) {
    return httpWrapper(() => api.get(`drills/all`), callback);
};

export function get_drill(drill_id: number, callback: (drill: Drill) => void) {
    return httpWrapper(() => api.get(`drills/${drill_id}`), callback);
};
