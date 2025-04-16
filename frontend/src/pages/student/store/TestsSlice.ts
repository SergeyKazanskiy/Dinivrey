import { Test } from '../model';
import { TestSlice } from './TestSlice';
import { add_test, update_student_test, delete_student_test} from '../http';
import { getChanges, formatDateTime, objectToJson } from '../../../shared/utils';


export interface TestsSlice {
    tests: Test[];
    isTestPopover: boolean;

    test_id: number;
    testColumn: string;
    testValue: number;

    isTestModal: boolean;
    isTestUpdate: boolean;
    isTestDelete: boolean;

    setTests:(tests: Test[]) => void; //student loaded
    selectTestCell:(test_id: number, testColumn: string) => void;
    
    addTest:() => void;
    updateTestCell:(value: number) => void;
    updateTest:() => void;
    deleteTest:() => void;

    openUpdateTest:() => void;
    openDeleteTest:() => void;
    closeTestModal:() => void;
}

export const createTestsSlice = (set: any, get: any): TestsSlice => ({
    tests:[
        {
            id: 1,
            student_id: 0,
            timestamp: 0,
            date: '',
            speed: 5,
            stamina: 4,
            climbing: 4,
            evasion: 2,
            hiding: 7
        },
        {
            id: 2,
            student_id: 0,
            timestamp: 0,
            date: '',
            speed: 5,
            stamina: 6,
            climbing: 4,
            evasion: 2,
            hiding: 2
        },
        {
            id: 3,
            student_id: 0,
            timestamp: 0,
            date: '',
            speed: 4,
            stamina: 8,
            climbing: 2,
            evasion: 2,
            hiding: 5
        },
        {
            id: 4,
            student_id: 0,
            timestamp: 0,
            date: '',
            speed: 5,
            stamina: 8,
            climbing: 2,
            evasion: 2,
            hiding: 5
        }
    ],
    isTestPopover: false,
    
    test_id: 0,
    testColumn: '',
    testValue: 0,

    isTestModal: false,
    isTestUpdate: false,
    isTestDelete: false,

    setTests:(tests: Test[]) => set({ tests }),

    selectTestCell:(test_id: number, testColumn: string) => {
        const { tests, setTest }: TestsSlice & TestSlice = get();
        const test = tests.find(item => item.id === test_id)!
        const value = test[testColumn as keyof Test];
        
        set({ test_id, testColumn, isTestPopover: testColumn !== 'date', testValue: value})
        setTest(test);
    },

    addTest:() => {
        const { getNewTest }: TestSlice = get();
        const newTest: Omit<Test, 'id'> = getNewTest();
        const timestamp = Date.now();
        newTest.timestamp = timestamp;
        newTest.date = formatDateTime(timestamp).date;
        //alert(objectToJson(newTest));
        add_test(newTest, (res) => {
            if (res.id) {
                const test: Test = {...newTest, id: res.id};
                set((state: TestsSlice) => ({ tests: [ ...state.tests, test] }));
            }     
        })
    },

    updateTestCell: (value: number) => {
        //alert(value)
        const { testColumn, updateTest }: TestsSlice= get();
        const { setSpeed, setStamina, setClimbing, setEvasion, setHiding }: TestSlice = get();
        if (testColumn === "speed") setSpeed(value);
        if (testColumn === "stamina") setStamina(value);
        if (testColumn === "climbing") setClimbing(value);
        if (testColumn === "evasion") setEvasion(value);
        if (testColumn === "hiding") setHiding(value);

        updateTest();
    },

    updateTest:() => {
        const { getUpdatedTest, tests, test_id }: TestSlice & TestsSlice= get();
        const updatedTest = getUpdatedTest();
        const test = tests.find(item => item.id === test_id)!
        const data: Partial<Test> = getChanges(test, updatedTest);

        update_student_test(test.id, data, (res => {
            if (res.isOk) {
                set((state: TestsSlice) => ({
                    tests: state.tests.map(el => el.id === test.id ? updatedTest : el),
                }))
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
