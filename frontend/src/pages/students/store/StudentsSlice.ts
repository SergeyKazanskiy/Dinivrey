import { create_student, delete_student, create_student_parents } from '../http';
import { Student } from '../model';
import { GroupsSlice } from './GroupsSlice';
import { StudentsIcons } from '../../../shared/constants';
import { objectToJson } from '../../../shared/utils';
import { CampsSlice } from './CampsSlice';
import { Parent } from '../../student/model';
import { ParentsSlice } from '../../student/store/ParentsSlice';


export interface StudentsSlice {
    students: Student[];
    studentId: number;

    setStudents: (students: Student[]) => void;
    selectStudent: (id: number) => void;
    updateStudents: (student: Student) => void;

    createStudent: (studentPopover: Partial<Student>) => void;
    deleteStudent: (id: number) => void;
}

export const createStudentsSlice = (set: any, get: any): StudentsSlice => ({
    students: [],
    studentId: 1,

    setStudents: (students: Student[]) => set({ students, students_id: 0 }),
    selectStudent: (id: number) => {set({ isStudentOpen: true, studentId: id })},

    updateStudents: (student: Student) => set((state: StudentsSlice) => ({
        students: state.students.map(el => el.id === student.id ? student : el)
    })),

    createStudent: ({ first_name, last_name, gender, age }: Partial<Student>) => {
        const { group_id }: GroupsSlice = get();
        const photo: string = `${StudentsIcons[gender! as keyof typeof StudentsIcons]}`
        const studentData: Omit<Student, 'id'> = {
            group_id,
            first_name: first_name!,
            last_name: last_name!,
            gender: gender!,
            age: age!,
            photo,
            active: true
        }
       // alert(objectToJson(data))
        create_student(studentData, (res)=> {
            if (res.id) {
                const parentsData: Omit<Parent, 'id'>[] = [
                    { student_id: res.id, name: '', phone: '', email: ''},
                    { student_id: res.id, name: '', phone: '', email: ''},
                ];
                create_student_parents(parentsData, (ids)=> {
                    if (ids.length === 2) {
                        set((state: StudentsSlice) => ({
                           students: [...state.students, {...studentData, id: res.id}],
                            studentId: res.id
                        }));

                       // const createdParents: Parent[] = parentsData.map((el, inx) => ({...el, id: ids[inx]}));
                        //const {setParents}: ParentsSlice = get();
                       // setParents(createdParents);
                    };
                });
            };
        });
    },

    deleteStudent: (id: number) => {
        delete_student(id, (res) => {
            if (res.isOk) {
                set((state: StudentsSlice) => ({
                    students: state.students.filter(el => el.id !== id),
                    studentId: 0, isStudentOpen: false
                }));
            };
        });
    },
});