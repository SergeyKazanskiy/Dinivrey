import {  Parent } from '../model';


export interface ParentsSlice {
    initialParents: Parent[];
    parents: Parent[];
    isParentsChanged: boolean;

    setParentName:(name: string, inx: number) => void;
    setParentPhone:(phone: string, inx: number) => void;
    setParentEmail:(email: string, inx: number) => void;

    checkParents:() => void;
    setParents:(parents: Parent[]) => void;
    setInitialParents:(parents: Parent[]) => void;
}

export const createParentsSlice = (set: any, get: any): ParentsSlice => ({
    initialParents: [],
    parents: [
        { id: 0, student_id: 1, name: '', phone: '', email: ''},
        { id: 1, student_id: 1, name: '', phone: '', email: ''},
    ],
    isParentsChanged: false,

    setParentName:(name: string, inx: number) => {
        set((state: ParentsSlice) => ({
            parents: state.parents.map((parent, index) =>
                index === inx ? { ...parent, name } : parent),
        }));
        const { checkParents }: ParentsSlice = get();
        checkParents();
    },

    setParentPhone:(phone: string, inx: number) => {
        set((state: ParentsSlice) => ({
        parents: state.parents.map((parent, index) =>
            index === inx ? { ...parent, phone } : parent),
        }));
        const { checkParents }: ParentsSlice = get();
        checkParents();
    },

    setParentEmail:(email: string, inx: number) => {
        set((state: ParentsSlice) => ({
            parents: state.parents.map((parent, index) =>
                index === inx ? { ...parent, email } : parent),
        }));
        const { checkParents }: ParentsSlice = get();
        checkParents();
    },

    checkParents:() => {
        const { parents, initialParents }: ParentsSlice = get();
        const isParentsChanged = 
            parents[0].name !== initialParents[0].name ||
            parents[0].phone !== initialParents[0].phone ||
            parents[0].email !== initialParents[0].email ||
            parents[1].name !== initialParents[1].name ||
            parents[1].phone !== initialParents[1].phone ||
            parents[1].email !== initialParents[1].email;
        set({ isParentsChanged });    
    },

    setParents:(parents: Parent[]) => set({ parents, initialParents: parents, isParentsChanged: false }),
    setInitialParents:(parents: Parent[]) => set({ initialParents: parents, isParentsChanged: false }),
});

