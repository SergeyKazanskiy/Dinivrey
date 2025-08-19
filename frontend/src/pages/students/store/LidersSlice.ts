import { Lider } from '../model';
import { NumericFields } from '../../../shared/utils';
import { update_password } from '../http';


export interface LidersSlice {
    liders: Lider[];
    test: NumericFields<Lider>;
    tests: NumericFields<Lider>[];
    isPasswordDialog: boolean;

    student_id: number;
    student_password: string;
    student_name: string;

    setLiders: (liders: Lider[]) => void;
    selectTest: (test: NumericFields<Lider>) => void;

    showPasswordDialog: (student_id: number) => void;
    hidePasswordDialog: () => void;
    updatePassword: (password: string) => void;
}

export const createLidersSlice = (set: any, get: any): LidersSlice => ({
    liders: [],
    test: 'speed',       
    tests: ['speed', 'stamina', 'climbing', 'evasion', 'hiding'],
    isPasswordDialog: false,

    student_id: 0,
    student_password: '',
    student_name: '',

    setLiders: (liders: Lider[]) => set({
        test: 'speed',
        liders: liders.sort((a, b) => b.speed - a.speed)
    }),

    selectTest: (test: NumericFields<Lider>) => set((state: LidersSlice) => ({
        test,
        liders: [...state.liders].sort((a, b) => b[test] - a[test])
    })),

    showPasswordDialog: (student_id: number) => {
        const { liders }: LidersSlice = get();
        const student = liders.find(el => el.id === student_id)!

        set({
            student_id,
            student_password: student.password,
            student_name: student.first_name + ' ' + student.last_name,
            isPasswordDialog: true
        })
    },

    hidePasswordDialog: () =>  set({
        student_id: 0, isPasswordDialog: false, student_password: '', student_name: ''
    }),

    updatePassword: (password: string) => {
        const { student_id, liders }: LidersSlice = get();

        update_password(student_id, {password}, (res => {
            if (res.isOk) {
                const lider = liders.find(el => el.id === student_id)!;
                lider.password = password;
                
                set({
                    student_id: 0, isPasswordDialog: false,
                    student_password: '', student_name: ''
                });
            }
        }))
    }
});


