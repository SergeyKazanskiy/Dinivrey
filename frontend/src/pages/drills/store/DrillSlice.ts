import { Drill } from '../model';
import { DrillsSlice } from './DrillsSlice';


export interface DrillSlice {
    name: string;
    time: string;
    level: string;
    link: string;
    desc: string;
    category: string;
    actors: number;

    setName: (name: string) => void;
    setTime: (time: string) => void;
    setLevel: (level: string) => void;
    setLink: (link: string) => void;
    setDesc: (desc: string) => void;
    setCategory: (category: string) => void;
    setActors: (actors: number) => void;

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
    category: '',
    actors: 1,

    setName: (name: string) => set({ name }),
    setTime: (time: string) => set({ time }),
    setLevel: (level: string) => set({ level }),
    setLink: (link: string) => set({ link }),
    setDesc: (desc: string) => set({ desc }),
    setCategory: (category: string) => set({ category }),
    setActors: (actors: number) => set({ actors }),

    getNewDrill:() => {
        const { name, time, level, link, desc, category, actors }: DrillSlice = get();
        return { name, time, level, link, desc, category, actors }
    },

    getUpdatedDrill:() => {
        const { drill_id, name, time, level, link, desc, category, actors }: DrillsSlice & DrillSlice = get();
        return { id: drill_id, name, time, level, link, desc, category, actors }
    },

    clearDrill:() => set({ 
        name: '',
        time: '',
        level: '',
        link: '',
        desk: '',
        category: '',
        actors: 1,
    }),
});
