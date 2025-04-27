import { Lider } from '../model';
import { NumericFields } from '../../../shared/utils';

export interface LidersSlice {
    liders: Lider[];
    test: NumericFields<Lider>;
    tests: NumericFields<Lider>[];

    setLiders: (liders: Lider[]) => void;
    selectTest: (test: NumericFields<Lider>) => void;
}

export const createLidersSlice = (set: any, get: any): LidersSlice => ({
    liders: [],
    test: 'speed',       
    tests: ['speed', 'stamina', 'climbing', 'evasion', 'hiding'],

    setLiders: (liders: Lider[]) => set({
        test: 'speed',
        liders: liders.sort((a, b) => b.speed - a.speed)
    }),

    selectTest: (test: NumericFields<Lider>) => set((state: LidersSlice) => ({
        test,
        liders: [...state.liders].sort((a, b) => b[test] - a[test])
    })),
});


