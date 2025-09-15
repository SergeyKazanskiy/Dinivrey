import { httpWrapper } from '../../shared/http/httpWrapper';
import { api } from "../../api/student_api";
import { Student, Achievement, Achieve, Test, Game, Event, Camp,
    Schedule, Lider, Group, GameReport, Gamer, Team } from './model';


// Profile
export function save_notification_token(id: number, data: { "token_FCM": string }, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.post(`students/${id}/notification_token`, data), callback);
};

export function get_student(id: number, callback: (student: Student) => void) {
    return httpWrapper(() => api.get(`students/${id}`), callback);
};

export function update_student_avatar(id: number, data: { "avatar": string }, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.put(`students/${id}/avatar`, data), callback);
};

export function get_profile_achievements(id: number, callback: (achievements: Achievement[]) => void) {
    return httpWrapper(() => api.get(`students/${id}/achievements/profile`), callback);
};


export function get_last_test(student_id: number, callback: (tests: Test[]) => void) {
    return httpWrapper(() => api.get(`students/${student_id}/tests/last`), callback);
};

export function get_last_tests_limit(student_id: number, limit: number, callback: (tests: Test[]) => void) {
    return httpWrapper(() => api.get(`students/${student_id}/tests/limit?limit=${limit}`), callback);
};

export function get_last_game(student_id: number, callback: (games: Game[]) => void) {
    return httpWrapper(() => api.get(`students/${student_id}/games/last`), callback);
};

export function get_last_test_date(student_id: number, callback: (res: {year: number, month: number, isEvents: boolean}) => void) {
    return httpWrapper(() => api.get(`students/${student_id}/tests/last/date`), callback);
};

export function get_last_game_date(student_id: number, callback: (res: {year: number, month: number, isEvents: boolean}) => void) {
    return httpWrapper(() => api.get(`students/${student_id}/games/last/date`), callback);
};

export function get_upcoming_events(group_id: number, callback: (events: Event[]) => void) {
    return httpWrapper(() => api.get(`camps/groups/${group_id}/events/upcoming`), callback);
};

export function get_student_attendance_count(student_id: number, callback: (res: {count: number}) => void) {
    return httpWrapper(() => api.get(`students/${student_id}/attendances/count`), callback);
};

export function get_student_first_achieve(student_id: number, callback: (achievement: Achievement[]) => void) {
    return httpWrapper(() => api.get(`students/${student_id}/achievements/first`), callback);
};

export function get_student_group(group_id: number, callback: (group: Group) => void) {
    return httpWrapper(() => api.get(`camps/groups/${group_id}`), callback);
};

// Notifications
export function get_notifications_count(student_id: number, callback: (count: number) => void) {
  return httpWrapper(() => api.get(`students/${student_id}/notifications/count`), callback);
};

export function get_notifications(student_id: number, callback: (notifications: string[]) => void) {
  return httpWrapper(() => api.get(`students/${student_id}/notifications`), callback);
};

export function delete_notifications(student_id: number, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.delete(`students/${student_id}/notifications`), callback);
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

export function get_locked_achieves(student_id: number, callback: (achieves: Achieve[]) => void) {
    return httpWrapper(() => api.get(`students/${student_id}/achievements/locked`), callback); //return httpWrapper(() => api.get(`students/${student_id}/achievements`), callback);
};

export function update_student_achieve(id: number, data: { "in_profile": boolean, "profile_place": number }, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.put(`students/achievements/${id}`, data), callback);
};


// Events
export function get_group_last_event(group_id: number, callback: (res: {year: number, month: number, isEvents: boolean}) => void) {
    return httpWrapper(() => api.get(`camps/groups/${group_id}/events/latest`), callback);
};

export function get_group_events(group_id: number, year: number, month: number, callback: (events: Event[]) => void) {
    return httpWrapper(() => api.get(`camps/groups/${group_id}/events?year=${year}&month=${month}`), callback);
};

export function get_group_schedule(group_id: number, callback: (schedules: Schedule[]) => void) {
  return httpWrapper(() => api.get(`camps/groups/${group_id}/schedule`), callback, 'Getting schedule');
};

// Liders
export function get_camps(callback: (camps: Camp[]) => void) {
  return httpWrapper(() => api.get(`camps`), callback);
};

export function get_groups(camp_id: number, callback: (camps: Group[]) => void) {
    return httpWrapper(() => api.get(`camps/${camp_id}/groups`), callback, 'Getting groups');
};

export function get_liders(group_id: number, callback: (liders: Lider[]) => void) {
    return httpWrapper(() => api.get(`camps/groups/${group_id}/liders/`), callback, 'Getting liders');
};


//Games
export function get_student_game_reports(student_id: number, year: number, month: number,
    callback: (games: {game: GameReport, team:Team, is_survived: boolean}[]) => void) {
    return httpWrapper(() => api.get(`students/${student_id}/game-reports?year=${year}&month=${month}`), callback, 'Getting game-reports');
};

export function get_student_game_report(game_id: number, callback: (gameReport: GameReport) => void) {
    return httpWrapper(() => api.get(`students/game-reports/${game_id}`), callback, 'Getting game-report');
};

export function get_game_players(game_id: number, callback: (gamers: Gamer[]) => void) {
    return httpWrapper(() => api.get(`camps/events/games/${game_id}/gamers`), callback, 'Getting game players');
};

export function get_students(group_id: number, callback: (students: Student[]) => void) {
  return httpWrapper(() => api.get(`camps/groups/${group_id}/students/`), callback, 'Getting students');
};