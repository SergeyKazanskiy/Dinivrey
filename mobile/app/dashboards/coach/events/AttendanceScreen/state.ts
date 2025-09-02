import { Alert } from 'react-native';
import { Student, Attendance, Test, AttendanceDataForReport, Game, Notification } from '../model';
import { get_attendances, get_students_names, add_student_test, delete_student_test } from '../http';
import { add_attendances, update_attendance, delete_attendances, update_all_attendances } from '../http';
import { add_all_present_students_new_tests, send_attendance_report, get_is_report, get_event_games } from '../http';
import { EventsSlice } from '../EventsScreen/state';
import { TestingSlice } from '../TestingScreen/state';
import { isPast, formatDateTime, objectToJson } from '../../../../shared/utils';
import { GroupsSlice } from '../../students/GroupsScreen/state';


export interface AttendanceSlice {
    attendances: Attendance[];
    students: Student[];

    attendance_id: number;
    isAllChecked: boolean;

    isStudentsView: boolean;
    isAttendanceView: boolean;

    studentsAmount: number;
    attendancesAmount: number;

    isSendingReport: boolean;
    isReportSent: boolean;
    wasReportSent: boolean;

    games: Game[];
    game_id: number;

    notifications: Notification[];
    isNotificationsModal: boolean;


    loadAttendances:() => void;
    loadStudentsNames: (group_id: number) => void;

    checkStudent: (id: number) => void;
    setAllChecked: () => void;

    addAttendances: () => void;
    updateComment: (attendance_id: number, comment: string) => void;
    deleteAttendances: () => void;

    sendAttedanceReport: () => void;
    closeSuccessAlert: () => void;

    loadWasReportSent: () => void;

    loadGames: () => void; // for reports
    selectGameReport: (game_id: number) => void;

    showNotificationsModal:() => void;
    hideNotificationsModal:() => void;
}

export const createAttendanceSlice = (set: any, get: any): AttendanceSlice => ({
    attendances: [
        //{ id: 1, student_id: 1, first_name: 'Name 1', last_name: 'Name 12', present: true },
       // { id: 2, student_id: 2, first_name: 'Name 2', last_name: 'Name 22', present: true },
    ],

    students: [
       // { first_name: 'Name 1', last_name: 'Name 12' },
       // { first_name: 'Name 2', last_name: 'Name 22' },
    ],
    attendance_id: 0,
    isAllChecked: false,

    isStudentsView: false,
    isAttendanceView: false,

    studentsAmount: 0,
    attendancesAmount: 0,

    isSendingReport: false,
    isReportSent: false,
    wasReportSent: false,

    games: [],
    game_id: 0,

    notifications: [],
    isNotificationsModal: false,


    loadAttendances: () => {
        const { event_id, group_id, event_timestamp }: EventsSlice = get();
        set({ isAllChecked: false});
        
        get_attendances(event_id, group_id, event_timestamp, (attendances: Attendance[]) => {
            //alert(objectToJson(attendances))
            if (attendances.length > 0) {
                const attendancesAmount = attendances.reduce((acc, item) => {
                    if (item.present) {
                        return acc + 1;
                    }
                        return acc;
                    }, 0)
                set({ attendances, studentsAmount: attendances.length, attendancesAmount,
                    isStudentsView: false, isAttendanceView: true });
            } else {
                const { loadStudentsNames }: AttendanceSlice = get();
                loadStudentsNames(group_id);
            }
        })
    },

    loadStudentsNames: (group_id: number) => {
        get_students_names(group_id, (students: Student[]) => {
            set({ students, isStudentsView: true, isAttendanceView: false });
        });
    },

    checkStudent: (attendance_id: number) => {
        const { event_timestamp, events_shedules, event_id }: EventsSlice = get();
        const { attendances }: AttendanceSlice = get();
        const attendance = attendances.find(el => el.id === attendance_id);  
        
        if (attendance) {
            update_attendance(attendance_id, {student_id: attendance.student_id, present: !attendance.present}, (res) => {
                if (res.isOk) {
                    alert(objectToJson(res))

                    
                    const currentEvent = events_shedules.find(el => el.id === event_id);

                    if (currentEvent && currentEvent.type === 'Exam') {
                        if (attendance.present && attendance.test_id > 0) {
                            delete_student_test(attendance.test_id!, (res => {
                                if (res.isOk) {
                                    //alert('test deleted')
                                    attendance.test_id = 0;
                                } 
                            }));
                        } else if (!attendance.present && attendance.test_id === 0) {
                            const newTest: Omit<Test, 'id'> = {
                                student_id: attendance.student_id,
                                timestamp: event_timestamp,
                                date: formatDateTime(event_timestamp).date,
                                speed: 0.0, stamina: 0.0, climbing: 0.0, evasion: 0.0, hiding: 0.0,
                                speed_time: 0, stamina_time: 0, climbing_time: 0
                            };
                            add_student_test(newTest, (res) => {
                                if (res.id) {
                                   // alert('test created')
                                    attendance.test_id = res.id;
                                }     
                            })
                        }
                    }

                    attendance.present = !attendance.present;
                    
                    const attendancesAmount = attendances.reduce((acc, item) => {
                    if (item.present) {
                        return acc + 1;
                    }
                        return acc;
                    }, 0)
                    
                    set({
                        attendance_id, attendancesAmount,
                        attendances: attendances.map(el => el.id === attendance_id ? attendance : el),
                    });

                    if (res.notifications.length > 0) {
                        res.notifications.forEach(el => {
                            el.added = el.achievements.filter(item => item.isNew).length;
                            el.updated = el.achievements.filter(item => !item.isNew).length;
                        });
                        set((state: AttendanceSlice) => ({
                            notifications: state.notifications.concat(res.notifications)
                        }))
                    }
                }
            });
        };
    },

    setAllChecked: () => {
        const {event_id, group_id, isAllChecked, events_shedules}: EventsSlice & AttendanceSlice  = get();
        const data = {present: !isAllChecked};

        update_all_attendances(event_id, group_id, data, (res) => {
            if (res.isOk) {
                set((state: AttendanceSlice) => ({
                    isAllChecked: !isAllChecked,
                    attendances: state.attendances.map(el => ({...el, present: !isAllChecked}))
                }));
                
                const currentEvent = events_shedules.find(el => el.id === event_id);
                    
                if (currentEvent && currentEvent.type === 'Exam') {
                    add_all_present_students_new_tests(event_id, group_id, (res) => {
                        //alert('isOk')
                    })
                }

                if (res.notifications.length > 0) {
                    res.notifications.forEach(el => {
                        el.added = el.achievements.filter(item => item.isNew).length;
                        el.updated = el.achievements.filter(item => !item.isNew).length;
                    });
                    set((state: AttendanceSlice) => ({
                        notifications: state.notifications.concat(res.notifications)
                    }))
                }
            }
        });
    },

    addAttendances: () => {
        const {event_id, group_id}: AttendanceSlice & EventsSlice = get();

        add_attendances({event_id, group_id}, (res) => {
            if (res.isOk) {
                const {loadAttendances}: AttendanceSlice = get();
                loadAttendances();
            }
        });
    },

    updateComment: (attendance_id: number, comment: string)  => {
        //alert(comment)
        update_attendance(attendance_id, {comment}, (res) => {
            if (res.isOk) {
                set((state: AttendanceSlice) => ({
                    attendances: state.attendances.map(el => el.id === attendance_id ? {...el, comment} : el)
                }));
            }
        });
    },

    deleteAttendances: () => {
        const { event_id, group_id }: EventsSlice = get();
        
        delete_attendances(event_id, group_id, (res) => {
            if (res.isOk) {
                const { loadStudentsNames }: AttendanceSlice = get();
                loadStudentsNames(group_id);
                set({ attendances: [], isAllChecked: false });
            }
        });
    },

    sendAttedanceReport: () => {
        set({ isSendingReport: true });

        const { event_id, group_id, events_shedules, groups, group_number }: EventsSlice & GroupsSlice = get();
        const event = events_shedules.find(el => el.id === event_id)!;
        const group = groups.find(el => el.id === group_id)!;

        const data: AttendanceDataForReport = {
            date: formatDateTime(event.timestamp).date,
            time: formatDateTime(event.timestamp).time,
            group_id: group_id,
            event_id: event_id,
            camp_name: group.camp_name,
            group_name: group.name,
            group_number,
            coach_id: 1 //???
        }

        send_attendance_report(data, (res) => {
            if (res.isOk) {
                set({ isSendingReport: false, isReportSent: true, wasReportSent: true });
            }
        });
    },

    closeSuccessAlert: () =>  set({ isReportSent: false }),

    loadWasReportSent: () => {
        const { event_id, group_number}: EventsSlice = get();
        //alert(event_id + '_' + group_number)
        get_is_report(event_id, group_number, (res)=> {
            if (res) {
                set({ wasReportSent: res.is_report});
            }
        });
    },

    loadGames: () => {
        //alert('loadGames')
        const { event_id, group_id}: EventsSlice = get();

        get_event_games(event_id, group_id, (games: Game[]) => {
            //alert(objectToJson(games))
            set({ games });
        })
    },

    selectGameReport: (game_id: number) => set({game_id}),

    showNotificationsModal:() => { set({isNotificationsModal: true})},
    hideNotificationsModal:() => set({isNotificationsModal: false, notifications: []}),
});

