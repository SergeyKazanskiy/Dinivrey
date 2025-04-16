import { Student, Attendance } from '../model';
import { add_attendances, update_attendance, delete_attendances } from '../http';
import { EventsSlice } from '../store/EventsSlice';
import { EventSlice } from '../store/EventSlice';
import { StateSlice } from '../state';
import { isPast, isToday, isFuture} from '../../../shared/utils';


export interface StudentsSlice {
    attendances: Attendance[];
    students: Student[];
    attendance_id: number;
    openedGroupId: number;

    setStudents: (students: Student[]) => void;
    addAttendances: () => void;
    setAttendances: (attendances: Attendance[]) => void;
    checkStudent: (id: number) => void;
    deleteAttendances: () => void;
}

export const createStudentsSlice = (set: any, get: any): StudentsSlice => ({
    attendances: [
        { id: 1, student_id: 1, first_name: 'Name 1', last_name: 'Name 12', present: true },
        { id: 2, student_id: 2, first_name: 'Name 2', last_name: 'Name 22', present: true },
    ],

    students: [
        { first_name: 'Name 1', last_name: 'Name 12' },
        { first_name: 'Name 2', last_name: 'Name 22' },
    ],
    attendance_id: 0,
    openedGroupId: 0,

    setStudents: (students: Student[]) => set({ students }),
    addAttendances: () => {
        const {event_id, openedGroupId}: StudentsSlice & EventsSlice = get();
        //alert (openedGroupId)
        add_attendances({event_id, group_id: openedGroupId}, (res) => {
            if (res.isOk) {
                const {loadAttendances}: StateSlice = get();
                loadAttendances(event_id, openedGroupId);
            }
        })
    },

    setAttendances: (attendances: Attendance[]) => set({ attendances }),

    checkStudent: (attendance_id: number) => {
        const { timestamp }: EventSlice = get();
        if (!isToday(timestamp)) {
            alert(isPast(timestamp) ?
            'It is not possible to change past attendance!' :
            'It is not possible to change future attendance!');
            return
        }
        const { attendances  }: EventsSlice & EventSlice & StudentsSlice = get();
        const attendance = attendances.find(el => el.id === attendance_id);
        
        if (attendance) {
            update_attendance(attendance_id, {present: !attendance.present}, (res) => {
                if (res.isOk) {
                    attendance.present = !attendance.present;
                    set((state: StudentsSlice) => ({
                        attendance_id,
                        attendances: attendances.map(el => el.id === attendance_id ? attendance : el)
                    }))
                }
            });
        };
    },

    deleteAttendances: () => {
        const {event_id, openedGroupId}: StudentsSlice & EventsSlice = get();
        delete_attendances(event_id, openedGroupId, (res) => {
            if (res.isOk) {
                set((state: EventsSlice) => ({
                    isStudentsView: false,
                    isAttendanceView: false,
                    attendances: [],
                    students: []
                }));
            }
        })
    },
});

