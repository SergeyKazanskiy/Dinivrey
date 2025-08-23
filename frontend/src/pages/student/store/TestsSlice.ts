import { Test, TestUpdate } from '../model';
import { TestSlice } from './TestSlice';
import { add_test, update_student_test, delete_student_test} from '../http';
import { objectToJson, NumericFields, formatDateTime } from '../../../shared/utils';
import { CampsSlice } from '../../students/store/CampsSlice';
import { StateSlice } from '../state';


export interface TestsSlice {
    tests: Test[];
    test_id: number;

    testColumn: string;
    testValue: number;

    exam: NumericFields<Test>;
    exam_time: NumericFields<Test>;

    isTestModal: boolean;
    isTestUpdate: boolean;
    isTestDelete: boolean;

    setTests:(tests: Test[]) => void; //student loaded
    selectTestCell:(test_id: number, testColumn: string) => void;
    
    addTest:() => void;
    updateTest:(examValue: number) => void;
    deleteTest:() => void;

    openUpdateTest:() => void;
    openDeleteTest:() => void;
    closeTestModal:() => void;
}

export const createTestsSlice = (set: any, get: any): TestsSlice => ({
    tests:[],
    test_id: 0,

    testColumn: '',
    testValue: 0,

    exam: 'speed',
    exam_time: 'speed_time',
    
    isTestModal: false,
    isTestUpdate: false,
    isTestDelete: false,

    setTests:(tests: Test[]) => set({ tests }),

    selectTestCell:(test_id: number, testColumn: string) => {
        const { tests, setTest }: TestsSlice & TestSlice = get();
        const test = tests.find(item => item.id === test_id)!

        let value: number;
        if (testColumn === 'speed' || testColumn === 'stamina' || testColumn === 'climbing') {
            value = test[testColumn + '_time' as NumericFields<Test>];
        } else {
            value = test[testColumn as NumericFields<Test>];
        }

        set({ test_id, testColumn,
            testValue: value,
            isTestModal: testColumn !== 'date',
            isTestUpdate: testColumn !== 'date',
            exam: testColumn === 'date' ? '' : testColumn,
            exam_time: testColumn === 'speed' || testColumn === 'stamina' || testColumn === 'climbing' ?
            testColumn + '_time' : '',
        })
        setTest(test);
    },

    addTest:() => {
        const { getNewTest }: TestSlice = get();
        const newTest: Omit<Test, 'id'> = getNewTest();
        const timestamp = Date.now();
        newTest.timestamp = timestamp;
        newTest.date = formatDateTime(timestamp).date;
        
        add_test(newTest, (res) => {
            if (res.id) {
                const test: Test = {...newTest, id: res.id};
                set((state: TestsSlice) => ({ tests: [ ...state.tests, test] }));
            }     
        })
    },

    // updateTestCell: (value: number) => {
    //     //alert(value)
    //     const { testColumn, updateTest }: TestsSlice= get();
    //     const { setSpeed, setStamina, setClimbing, setEvasion, setHiding }: TestSlice = get();
    //     if (testColumn === "speed") setSpeed(value);
    //     if (testColumn === "stamina") setStamina(value);
    //     if (testColumn === "climbing") setClimbing(value);
    //     if (testColumn === "evasion") setEvasion(value);
    //     if (testColumn === "hiding") setHiding(value);

    //     updateTest();
    // },

    // updateTest:() => {
    //     const { getUpdatedTest, tests, test_id }: TestSlice & TestsSlice= get();
    //     const updatedTest = getUpdatedTest();
    //     const test = tests.find(item => item.id === test_id)!
    //     const data: Partial<Test> = getChanges(test, updatedTest);

    //     update_student_test(test.id, data, (res => {
    //         if (res.isOk) {
    //             set((state: TestsSlice) => ({
    //                 tests: state.tests.map(el => el.id === test.id ? updatedTest : el),
    //             }))
    //         }
    //     }));
    // },

    updateTest: (examValue: number) => {
        const { exam, exam_time, test_id, camp_id, tests, student_id }: TestsSlice & CampsSlice & StateSlice = get();
        const test = tests.find(el => el.id === test_id)!;

        const data: TestUpdate = {
            exam,
            value: examValue,
            camp_id: exam === 'speed' ? 0: camp_id
        }

        update_student_test(student_id, test_id, data, (res => {
            if (res) {
                test[exam] = res.score;
                if (res.time) {
                    test[exam_time] = res.time;
                }
                set((state: TestsSlice) => ({
                    testValue: examValue,
                    tests: state.tests.map(el => el.id === test_id ? test : el),
                    isTestModal: false,
                }));

                const { loadAchieves }: StateSlice = get();
                alert(objectToJson(res.achievements))
                loadAchieves();
            }
        }));
    },

    deleteTest:() => {
        const { test_id }: TestsSlice= get();
        delete_student_test(test_id, (res => {
            if (res.isOk) {
                set((state: TestsSlice) => ({ tests: state.tests.filter(el => el.id !== state.test_id) }));
            } 
        }));
       
        const { closeTestModal }: TestsSlice = get();
        closeTestModal();
    },

    openUpdateTest:() => set({isTestModal: true, isTestUpdate: true}),
    openDeleteTest:() => set({isTestModal: true, isTestDelete: true}),
    closeTestModal:() => set({isTestModal: false, isTestUpdate: false, isTestDelete: false}),
});
