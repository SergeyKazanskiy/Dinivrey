import { eventTypes } from '../../shared/constants';
import { EventSlice } from './store/EventSlice';
import { EventsSlice } from './store/EventsSlice';
import { FiltersSlice } from './store/FiltersSlice';
import { StudentsSlice } from './store/StudentsSlice';
import { get_camps, get_last_event, get_events, get_groups, get_attendances, get_students_names } from './http';
import { Camp, Group, Event, Student, Attendance } from './model';
import { getTimestamp } from '../../shared/utils';


export interface StateSlice {
    isModal: boolean;
    isAdd: boolean;
    isUpdate: boolean;
    isDelete: boolean;

    isStudentsView: boolean;
    isAttendanceView: boolean;

    loadCamps: () => void;
    loadGroups: (camp_id: number) => void;
    loadLastEvent: (camp_id: number) => void;
    loadEvents: (camp_id: number, year: number, month: number) => void;
    loadAttendances: (event_id: number, group_id: number) => void;

    openAddModal: () => void;
    openUpdateModal: () => void;
    openDeleteModal: () => void;
    closeModal: () => void;
}

export const createStateSlice = (set: any, get: any): StateSlice => ({
    isModal: false,
    isAdd: false,
    isUpdate: false,
    isDelete: false,
    isStudentsView: false,
    isAttendanceView: false,

    loadCamps: () => {
        get_camps((camps: Camp[]) => {
            if (camps.length > 0) {
                const camp_id: number = camps[0].id;
                const { setCamps, selectCamp }: FiltersSlice & StateSlice = get();
                setCamps(camps);
                selectCamp(camp_id, 0);
            }  
        })
    },

    loadGroups: (camp_id: number) => {
        get_groups(camp_id, (groups: Group[]) => {
            if (groups.length > 0) {
                const { setGroups }: FiltersSlice = get();
                setGroups(groups);
            }
        })
    },

    loadLastEvent: (camp_id: number) => {
        get_last_event(camp_id, (res) => {
            const { setDate, loadEvents }: FiltersSlice & StateSlice = get();
            setDate(res.year, res.month);
            if (res.isEvents) {
                loadEvents(camp_id, res.year, res.month);
            } else {
                const { setEvents }: EventsSlice = get();
                setEvents([]);
            }  
        })
    },

    loadEvents: (camp_id: number, year: number, month: number) => {
        get_events(camp_id, year, month, (events: Event[]) => {
            const { setEvents }: EventsSlice = get();
            setEvents(events)
        })
    },

    loadAttendances: (event_id: number, group_id: number) => {
        get_attendances(event_id, group_id, (attendances: Attendance[]) => {
            if (attendances.length > 0) {
                const { setAttendances }: StudentsSlice = get();
                setAttendances(attendances);
                set({ isStudentsView: false, isAttendanceView: true });
            } else {
                get_students_names(group_id, (students: Student[]) => {
                    const { setStudents }: StudentsSlice = get();
                    setStudents(students);
                    set({ isStudentsView: true, isAttendanceView: false });
                })
            }
        })
    },

    openAddModal: () => {
        const { year, month}: FiltersSlice = get();
        //const timestamp = getTimestamp(year, month); // for DateMenu
        const timestamp = Date.now();
        const { setTimestamp, setType, setDesc, setGroup1, setGroup2}: EventSlice = get();
        setTimestamp(timestamp);
        setType(eventTypes[0]);
        setDesc('');
        setGroup1(0);
        setGroup2(0);
        
        set({ isModal: true, isAdd: true, isUpdate: false, isDelete: false })
    },
    openUpdateModal: () => { set({ isModal: true, isAdd: false, isUpdate: true, isDelete: false })},
    openDeleteModal: () => set({ isModal: true, isAdd: false, isUpdate: false, isDelete: true }),
    closeModal: () => set({ isModal: false, isAdd: false, isUpdate: false, isDelete: false }),
});

//, isStudentsView: false