import { Camp, Parent, StudentShort } from '../model';
import { create_student, create_student_parents, get_students } from '../http';
import { objectToJson } from '@/app/shared/utils';
import { GroupsSlice } from '../GroupsScreen/state';
import { StudentsIcons } from '../../../../shared/constants';


export interface StudentsSlice {
  students: StudentShort[];
  student_id: number;
  isAddAlert: boolean;

  loadStudents: (group_id: number) => void;
  selectStudent: (student_id: number) => void;
  clearStudents: () => void;

  showAddAlert: () => void;
  hideAddAlert: () => void;

  createStudent: (studentPopover: Partial<StudentShort>) => void;
}

export const createStudentsSlice = (set: any, get: any): StudentsSlice => ({
  students: [],
  student_id: 0,
  isAddAlert: false,

  loadStudents: (group_id: number) => {
    get_students(group_id, (students: StudentShort[]) => {
      //alert(objectToJson(students))
      set({ students });
    })
  },

  selectStudent: (student_id: number) => set({ student_id }),
  clearStudents: () => set({ student_id: 0, students: [] }),

  showAddAlert: () => set({ isAddAlert: true }),
  hideAddAlert: () => set({ isAddAlert: false }),

   createStudent: ({ first_name, last_name, gender, age }: Partial<StudentShort>) => {
        const { group_id }: GroupsSlice = get();
        const photo: string = `${StudentsIcons[gender! as keyof typeof StudentsIcons]}`
        const studentData: Omit<StudentShort, 'id'> = {
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
                    };
                });
            };
        });
    },
});
