import {  Attendance } from '../model';


export interface AttendanceSlice {
    trainingsAttendance: number;
    testsAttendance: number;
    gamesAttendance: number;
    totalAttendance: number;

    setAttendance:(attendance: Attendance) => void;
}

export const createAttendanceSlice = (set: any, get: any): AttendanceSlice => ({
    trainingsAttendance: 0,
    testsAttendance: 0,
    gamesAttendance: 0,
    totalAttendance: 0,

    setAttendance:(attendance: Attendance) => set({
        trainingsAttendance: attendance.trainings,
        testsAttendance: attendance.tests,
        gamesAttendance: attendance.games,
        totalAttendance: attendance.total,
    }),
});