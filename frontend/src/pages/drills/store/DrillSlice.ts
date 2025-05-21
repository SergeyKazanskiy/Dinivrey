import { Drill } from '../model';
import { DrillsSlice } from './DrillsSlice';


export interface DrillSlice {
    name: string;
    time: string;
    level: string;
    link: string;
    desc: string;

    setName: (name: string) => void;
    setTime: (time: string) => void;
    setLevel: (level: string) => void;
    setLink: (link: string) => void;
    setDesc: (desc: string) => void;

    getNewDrill:() => Omit<Drill, 'id'>;
    getUpdatedDrill:() => Drill;
    clearDrill:() => void;
}

export const createDrillSlice = (set: any, get: any): DrillSlice => ({
    name: '',
    time: '',
    level: '',
    link: '',
    desc: '',

    setName: (name: string) => set({ name }),
    setTime: (time: string) => set({ time }),
    setLevel: (level: string) => set({ level }),
    setLink: (link: string) => set({ link }),
    setDesc: (desc: string) => set({ desc }),

    getNewDrill:() => {
        const { name, time, level, link, desc }: DrillSlice = get();
        return { name, time, level, link, desc }
    },

    getUpdatedDrill:() => {
        const { drill_id, name, time, level, link, desc }: DrillsSlice & DrillSlice = get();
        return { id: drill_id, name, time, level, link, desc }
    },

    clearDrill:() => set({ 
        name: '',
        time: '',
        level: '',
        link: '',
        desk: '',
    }),
});
