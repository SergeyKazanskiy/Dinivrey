import {  Test } from '../model';
import { StateSlice } from '../state';


export interface TestSlice {
    id: number;
    timestamp: number;
    date: string;

    speed: number;
    stamina: number;
    climbing: number;
    evasion: number;
    hiding: number;

    speed_time: number;
    stamina_time: number;
    climbing_time: number;

    setSpeed:(speed: number) => void;
    setStamina:(stamina: number) => void;
    setClimbing:(climbing: number) => void;
    setEvasion:(evasion: number) => void;
    setHiding:(hiding: number) => void;

    setTest: (test: Test) => void;
    getNewTest:() => Omit<Test, 'id'>;
   // getUpdatedTest: () => Test;
}

export const createTestSlice = (set: any, get: any): TestSlice => ({
    id: 0,
    timestamp: 0,
    date: '',

    speed: 0,
    stamina: 0,
    climbing: 0,
    evasion: 0,
    hiding: 0,

    speed_time: 0,
    stamina_time: 0,
    climbing_time: 0,

    setSpeed:(speed: number) => set({ speed }),
    setStamina:(stamina: number) => set({ stamina }),
    setClimbing:(climbing: number) => set({ climbing }),
    setEvasion:(evasion: number) => set({ evasion }),
    setHiding:(hiding: number) => set({ hiding }),

    setTest: ({ id, timestamp, date, speed, stamina, climbing, evasion, hiding,
        speed_time, stamina_time, climbing_time }: Test) =>
        set({ id, timestamp,  date, speed, stamina, climbing, evasion, hiding,
            speed_time, stamina_time, climbing_time }),

    getNewTest:() => {
        const { student_id, timestamp, date, speed, stamina, climbing, evasion, hiding,
            speed_time, stamina_time, climbing_time }: StateSlice & TestSlice = get();
        return { student_id, timestamp, date, speed: 0, stamina: 0, climbing: 0, evasion: 0, hiding: 0,
            speed_time: 0, stamina_time: 0, climbing_time: 0 }
    },

    // getUpdatedTest:() => {
    //     const { id, timestamp, date, speed, stamina, climbing, evasion, hiding,
    //         speed_time, stamina_time, climbing_time }: TestSlice = get();
    //     return { id, timestamp, date, speed, stamina, climbing, evasion, hiding,
    //         speed_time, stamina_time, climbing_time }
    // },
});
