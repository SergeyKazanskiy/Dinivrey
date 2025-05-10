import { Alert } from 'react-native';
import { Student, Attendance } from '../model';
import { get_attendances, get_students_names } from '../http';
import { add_attendances, update_attendance, delete_attendances, update_all_attendances } from '../http';
import { EventsSlice } from '../../events/EventsScreen/state'; 
import { isPast, isToday, isFuture} from '../../../../shared/utils';


export interface AttendanceSlice {
    attendances: Attendance[];
    students: Student[];

    attendance_id: number;
    isAllChecked: boolean;

    isStudentsView: boolean;
    isAttendanceView: boolean;

    loadAttendances:() => void;
    loadStudentsNames: (group_id: number) => void;

    addAttendances: () => void;
    checkStudent: (id: number) => void;
    deleteAttendances: () => void;
    
    setAllChecked: () => void;
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

    loadAttendances: () => {
        const { event_id, group_id }: EventsSlice = get();

        get_attendances(event_id, group_id, (attendances: Attendance[]) => {
            if (attendances.length > 0) {
                set({ attendances, isStudentsView: false, isAttendanceView: true });
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

    addAttendances: () => {
        const {event_id, group_id}: AttendanceSlice & EventsSlice = get();

        add_attendances({event_id, group_id}, (res) => {
            if (res.isOk) {
                const {loadAttendances}: AttendanceSlice = get();
                loadAttendances();
            }
        });
    },

    checkStudent: (attendance_id: number) => {
        const { timestamp }: EventsSlice = get();
        if (isPast(timestamp)) {
            //alert('It is not possible to change past attendance!');
            return
        }
        const { attendances }: AttendanceSlice = get();
        const attendance = attendances.find(el => el.id === attendance_id);
        
        if (attendance) {
            update_attendance(attendance_id, {present: !attendance.present}, (res) => {
                if (res.isOk) {
                    attendance.present = !attendance.present;
                    set({
                        attendance_id,
                        attendances: attendances.map(el => el.id === attendance_id ? attendance : el)
                    });
                }
            });
        };
    },

    deleteAttendances: () => {
        const { event_id, group_id }: EventsSlice = get();
        delete_attendances(event_id, group_id, (res) => {
            if (res.isOk) {
                const { loadStudentsNames }: AttendanceSlice = get();
                loadStudentsNames(group_id);
                set({ attendances: [] });
            }
        });
    },

    setAllChecked: () => {
        const {event_id, group_id, isAllChecked}: EventsSlice & AttendanceSlice  = get();
        const data = {present: !isAllChecked};

        update_all_attendances(event_id, group_id, data, (res) => {
            if (res.isOk) {
                set((state: AttendanceSlice) => ({
                    isAllChecked: !isAllChecked,
                    attendances: state.attendances.map(el => ({...el, present: !isAllChecked}))
                }));
            }
        });
    }
});

