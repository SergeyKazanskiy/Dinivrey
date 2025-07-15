import { Lider } from '../model';
import { NumericFields } from '../../../shared/utils';
import { StateSlice } from '../state';
import { CampsSlice } from './CampsSlice';


export interface LidersSlice {
    liders: Lider[];
    test: string;
    testNames: NumericFields<Lider>[];

    clearLiders: () => void;

    setLiders: (liders: Lider[]) => void;
    selectTest: (test: NumericFields<Lider>) => void;
}

export const createLidersSlice = (set: any, get: any): LidersSlice => ({
    liders: [],
    test: '',       
    testNames: ['speed', 'stamina', 'climbing', 'evasion', 'hiding'],


    clearLiders: () => set({ liders: [], test: '' }),
    
    setLiders: (liders: Lider[]) => set({ liders }),

    selectTest: (selectedTest: NumericFields<Lider>) => {
        const { test }: LidersSlice = get();

        if (selectedTest === test) {
            set({test: '', liders: []});
        } else {
            set({test: selectedTest});

            const { loadLiders, campId }: StateSlice & CampsSlice = get();
            loadLiders(campId, selectedTest);
        }

    },
});


