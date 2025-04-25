import { httpWrapper } from '../../shared/http/httpWrapper';
import { api } from "../../api/student_api";
import { Student, Achievement, Test, Game, Event, Lider, Group } from './model';


// Profile
export function get_student(id: number, callback: (student: Student) => void) {
    return httpWrapper(() => api.get(`students/${id}`), callback);
};

export function get_profile_achievements(id: number, callback: (achievements: Achievement[]) => void) {
    return httpWrapper(() => api.get(`students/${id}/achievements/profile`), callback);
};

export function get_last_test(id: number, callback: (test: Test) => void) {
    return httpWrapper(() => api.get(`students/${id}/tests/last`), callback);
};

export function get_last_game(id: number, callback: (game: Game) => void) {
    return httpWrapper(() => api.get(`students/${id}/games/last`), callback);
};

export function get_upcoming_events(id: number, callback: (events: Event[]) => void) {
    return httpWrapper(() => api.get(`students/${id}/events/upcoming`), callback);
};


// Statistics
export function get_student_tests(student_id: number, year: number, month: number, callback: (tests: Test[]) => void) {
    return httpWrapper(() => api.get(`students/${student_id}/tests?year=${year}&month=${month}`), callback);
};

export function get_student_games(student_id: number, year: number, month: number, callback: (games: Game[]) => void) {
    return httpWrapper(() => api.get(`students/${student_id}/games?year=${year}&month=${month}`), callback);
};


// Achievements
export function get_student_achieves(student_id: number, callback: (achieves: Achievement[]) => void) {
    return httpWrapper(() => api.get(`students/${student_id}/achievements`), callback); //return httpWrapper(() => api.get(`students/${student_id}/achievements`), callback);
};

export function update_student_achieve(id: number, data: Partial<Achievement>, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.put(`students/achievements/${id}`, data), callback);
};


// Events
export function get_group_events(group_id: number, year: number, month: number, callback: (events: Event[]) => void) {
    return httpWrapper(() => api.get(`groups/${group_id}/events?year=${year}&month=${month}`), callback);
};


// Liders
export function get_liders(group_id: number, callback: (liders: Lider[]) => void) {
    return httpWrapper(() => api.get(`groups/${group_id}/liders/`), callback, 'Getting liders');
};

export function get_groups(camp_id: number, callback: (camps: Group[]) => void) {
    return httpWrapper(() => api.get(`camps/${camp_id}/groups`), callback, 'Getting groups');
};
