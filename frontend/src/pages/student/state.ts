import { get_student, get_student_parents, get_student_attendance_percent, get_test_games,
    get_student_achieves, get_student_tests, get_student_games, get_last_test_date} from './http';
import { Student, Parent, Attendance, Test, Game, Achieve, Achievement, TestGame } from './model';
import { ProfileSlice } from './store/ProfileSlice';
import { AddressSlice } from './store/AddressSlice';
import { GroupsSlice } from './store/GroupsSlice';
import { ParentsSlice } from './store/ParentsSlice';
import { update_student, get_notifications_count, get_notifications } from './http';
import { getChanges, getCurrentYear, getCurrentMonth } from '../../shared/utils';
import { Normalize, normalizeObject, objectToJson } from '../../shared/utils';
import { update_student_parents, get_base_achieves } from './http';
import { Student as StudentShort  } from '../students/model';
import { TestsSlice } from './store/TestsSlice';
import { GamesSlice } from './store/GamesSlice';
import { EventsSlice } from './store/EventsSlice';
import { AchievesSlice } from './store/AchievesSlice';
import { AttendanceSlice } from './store/AttendanceSlice';


export interface StateSlice {
   // photo: string;
    student: Student | null;
    initialStudent: Normalize<Student>;
    student_id: number;

   // setPhoto:(photo: string) => void;
    loadStudent:(studentId: number, camp_id: number) => void;
    updateStudent:(completed: (student: StudentShort) => void) => void;

    loadAttendance: () => void;

    loadLastTestDate: () => void;
    loadTests: () => void;
    loadGames: () => void;
    loadTestGames: () => void;

    loadAchieves: () => void;
    loadBaseAchieves: (category: string) => void;

    loadNotificationsCount: (studentId: number) => void;
    loadNotifications: (studentId: number) => void;
}

export const createStateSlice = (set: any, get: any): StateSlice => ({
   // photo: '',
    student: null,
    initialStudent: {id:0, photo: '', first_name: '', last_name: '', phone: '', age: 0, gender: '',
        active: false, city: '', street: '', house: '', group_id: 0, group_extra_id: 0 },
    student_id: 0,

   // setPhoto:(photo: string) => set({ photo }),

    loadStudent:(studentId: number, camp_id: number) => {
        const { setPhoto, setFirstName, setLastName, setGender, setAge, setIsActive, setPhone }: ProfileSlice = get();
        const { setCity, setStreet, setHome}: AddressSlice = get();
        const { setCamp, setGroup, setGroupExtra}: GroupsSlice = get();
        const { initialStudent, loadLastTestDate, loadGames, loadAchieves, loadAttendance }: StateSlice = get();
        const { selectDate }: EventsSlice = get();

        get_student(studentId, (student: Student) => {
            if (student) {
                const normalizedStudent = normalizeObject(student, initialStudent);
                set({ student: normalizedStudent, student_id: studentId });

                const {photo, first_name, last_name, age, gender, active, phone,
                    city, street, house, group_id, group_extra_id } = normalizedStudent;
               
                setPhoto(photo);
                setFirstName(first_name);
                setLastName(last_name);
                setAge(age);
                setGender(gender);
                setIsActive(active);
                setPhone(phone);

                setCity(city);
                setStreet(street);
                setHome(house);

                setCamp(camp_id);
                setGroup(group_id);
                setGroupExtra(group_extra_id);

                get_student_parents(studentId, (parents: Parent[]) => {
                    const { setParents, initialParents }: ParentsSlice = get();
                    if (parents.length === 2) {
                        setParents(parents);
                    } else {
                        setParents(initialParents);
                    }
                });

                selectDate(getCurrentYear(), getCurrentMonth());
                loadLastTestDate();
                loadGames();
                loadAchieves();
                loadAttendance();
            }
        });
    },

    loadAttendance: () => {
        const { student_id }: StateSlice = get();
        get_student_attendance_percent(student_id, (attendance: Attendance) => {
            const { setAttendance }: AttendanceSlice = get();
            setAttendance(attendance);
        })
    },

    loadLastTestDate: () => {
        const { student_id, loadTests }: StateSlice & EventsSlice = get();

        get_last_test_date(student_id, (res => {
            set({ year: res.year, month: res.month });
        
            if (res.isEvents) {
                loadTests();
            }
        }));
    },

    loadTests: () => {
        const { student_id, year, month }: StateSlice & EventsSlice = get();

        get_student_tests(student_id, year, month, (tests: Test[]) => {
            const { setTests }: TestsSlice = get();
            
            setTests(tests)
        })
    },
    
    loadGames: () => {
        const { student_id, year, month }: StateSlice & EventsSlice = get();

        get_student_games(student_id, year, month, (games: Game[]) => {
            //alert(objectToJson(games))
            const { setGames }: GamesSlice = get();

            setGames(games)
        })
    },

    loadTestGames: () => {
        get_test_games((games: TestGame[]) => {
            const { setTestGames }: GamesSlice = get();
           // alert(objectToJson(games))
            setTestGames(games)
        })
    },

    loadAchieves: () => {
        const { student_id }: StateSlice = get();
        get_student_achieves(student_id, (achieves: Achievement[]) => {
            const { setStudentAchieves }: AchievesSlice = get();
            setStudentAchieves(achieves);
        })
    },

    loadBaseAchieves: (category: string) => {
        const { setBaseAchieves }: AchievesSlice = get();
            setBaseAchieves([]);
        get_base_achieves(category, 'Manual', (achieves: Achieve[]) => {
            const {studentAchieves}: AchievesSlice = get();
            const ids: number[] = studentAchieves.map(el => el.achieve_id);
            const unik: Achieve[] = achieves.filter(el => !ids.includes(el.id))

            setBaseAchieves(unik);
        });
    },

    loadNotificationsCount: (studentId: number) => {
        get_notifications_count(studentId, (count: number) => {
            set({notifications_count: count});
        })
    },

    loadNotifications: (studentId: number) => {
        get_notifications(studentId, (notifications: string[]) => {
            set({notifications});
        })
    },

    updateStudent:(completed: (student: StudentShort) => void) => {
        const { isProfileChanged, isAddressChanged, isGroupsChanged }: ProfileSlice & AddressSlice & GroupsSlice= get();
        if (isProfileChanged || isAddressChanged || isGroupsChanged) {
            const { student, getProfile, getAddress, getStudentGroups }: StateSlice & ProfileSlice & AddressSlice & GroupsSlice= get();
            if (student) {
                const { photo, first_name, last_name, phone, age, gender, active } = getProfile();
                const { city, street, house } = getAddress();
                const { group_id, group_extra_id } = getStudentGroups();
                const updatedStudent: Student = { id: student.id, photo, first_name, last_name, phone, age, gender, active,
                    city, street, house, group_id, group_extra_id
                }
                const data: Partial<Student> = getChanges(student, updatedStudent);
                const id = student.id;
                //alert(objectToJson(data));
                update_student(id, data, (res => {
                    if (res.isOk) {
                        set({ student: updatedStudent,
                            isProfileChanged: false, isAddressChanged: false, isGroupsChanged: false });
                        const studentShort: StudentShort = {id, photo, first_name, last_name, phone, age, gender, active, group_id};
                        completed(studentShort)
                    }
                }));
            }
        }

        const { isParentsChanged }: ParentsSlice= get();
        if (isParentsChanged) {
            const { student, parents, setInitialParents }: StateSlice & ParentsSlice = get();
            if (student) {
                update_student_parents(parents, (res => {
                    if (res.isOk) {
                        setInitialParents(parents);
                    }
                }));
            }
        }
    },
});