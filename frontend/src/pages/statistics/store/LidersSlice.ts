import { Lider } from '../model';
import { NumericFields } from '../../../shared/utils';
import { StateSlice } from '../state';
import { CampsSlice } from './CampsSlice';


export interface LidersSlice {
    liders: Lider[];
    test: NumericFields<Lider>;
    testNames: NumericFields<Lider>[];

    setLiders: (liders: Lider[]) => void;
    selectTest: (test: NumericFields<Lider>) => void;
}

export const createLidersSlice = (set: any, get: any): LidersSlice => ({
    liders: [],
    test: 'speed',       
    testNames: ['speed', 'stamina', 'climbing', 'evasion', 'hiding'],

    setLiders: (liders: Lider[]) => set({
        test: 'speed',
        liders: liders.sort((a, b) => b.speed - a.speed)
    }),

    selectTest: (test: NumericFields<Lider>) => {
        set({test});

        const { loadLiders, campId }: StateSlice & CampsSlice= get();
        loadLiders(campId, test);
    },
});


