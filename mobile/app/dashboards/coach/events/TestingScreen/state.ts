import { Store } from "../store";
import { Tester, TestUpdate } from "../model";
import { get_testers, update_student_test, add_all_present_students_new_tests, get_camp_location } from '../http';
import { NumericFields, objectToJson } from '../../../../shared/utils';
import { EventsSlice } from '../EventsScreen/state';
import { AttendanceSlice } from "../AttendanceScreen/state";
import { Locations } from '../../../../shared/constants';


export interface TestingSlice {
    testers: Tester[];
    testerName: string;

    exams: NumericFields<Tester>[];
    exam: NumericFields<Tester>;
    location:string;

    isModal: boolean;
    tester_id: number;
    examValue: number;

    
    loadTesters: () => void;
    loadLocation: () => void;

    selectMenu: (item: string) => void;
    selectExam: (test: NumericFields<Tester>) => void;

    onTesterCheck: (student_id: number) => void;
    onTesterClick: (student_id: number) => void;

    closeModal: () => void;
    updateTest: (examValue: number) => void;
}

export const createTestingSlice = (set: any, get: () => Store): TestingSlice => ({
    testers: [],
    testerName:'',

    exam: 'speed',       
    exams: ['speed', 'stamina', 'climbing', 'evasion', 'hiding'],
    location: '',

    isModal: false,
    tester_id: 0,
    examValue: 0,


    loadTesters: () => {
        const { event_id, group_id, event_timestamp }: EventsSlice = get();

        get_testers(event_id, group_id, event_timestamp, (testers: Tester[]) => {
            //alert(objectToJson(testers));
            const participants = testers.map(el => ({...el, participate: true}))
            set({ exam: 'speed', testers: participants });
        })
    },

    loadLocation: () => {
        const { group_id }: EventsSlice = get();

        get_camp_location(group_id, (location: string) => {
            set({ location });
        })
    },

    selectMenu: (item: string) => {
        if (item === 'Add participants') {
            const { event_id, group_id }: EventsSlice = get();

            add_all_present_students_new_tests(event_id, group_id, (res) => {
                const { loadTesters }: TestingSlice = get();
                loadTesters();
            })
        }
    },

    selectExam: (selected: NumericFields<Tester>) => {
        const { exam }: TestingSlice = get();

        set((state: TestingSlice) => ({
            exam: selected === state.exam ? '' : selected,
        }))
    },

    onTesterCheck: (tester_id: number) => {
        const { testers, exam }: TestingSlice = get();
        const tester = testers.find(el => el.id === tester_id)!;
        tester.participate = !tester.participate;
        set({
            tester_id,
            examValue: tester[exam],
            testerName: tester.first_name + ' ' + tester.last_name,
            attendances: testers.map(el => el.id === tester_id ? tester : el)
        });
    },

    onTesterClick: (tester_id: number) => {
        const { testers, exam }: TestingSlice = get();
        const tester = testers.find(el => el.id === tester_id)!;
        const field = exam === 'evasion' || exam === 'hiding' ? exam : exam + '_time'
        
        set({
            examValue: tester[field],
            isModal: true,
            testerName: tester.first_name + ' ' + tester.last_name,
            tester_id
        });
    },

    closeModal: () => set({ isModal: false }),

    updateTest: (examValue: number ) => {
        const { exam, tester_id, testers, location }: TestingSlice & EventsSlice = get();
        const tester = testers.find(el => el.id === tester_id)!;

        const location_inx = Locations.findIndex(el => el === location) + 1

        const data: TestUpdate = {
            exam,
            value: examValue,
            camp_id: exam === 'speed' ? 0: location_inx
        }
        //alert(objectToJson(data))
        update_student_test(tester.id, tester.test_id, data, (res => {
            alert(objectToJson(res))

            if (res) {
                tester[exam] = res.score;
                if (res.time) tester[exam + '_time'] = res.time;
               // alert(objectToJson(tester));
                set((state: TestingSlice) => ({
                    examValue,
                    testers: state.testers.map(el => el.id === tester_id ? tester : el),
                    isModal: false,
                }));
                if (res.notifications) {
                    res.notifications.forEach(el => {
                        el.added = el.achievements.filter(item => item.isNew).length;
                        el.updated = el.achievements.filter(item => !item.isNew).length;
                    });
                    set((state: AttendanceSlice) => ({
                        notifications: state.notifications.concat(res.notifications)
                    }))
                }
            }
        }));
    },
});
