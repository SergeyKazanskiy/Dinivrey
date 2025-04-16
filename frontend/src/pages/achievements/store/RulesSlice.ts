import {  Rule } from '../model';
import { RuleLevels } from '../../../shared/constants';


export interface RulesSlice {
    levels: string[];
    level: string;
    rules: Rule[];
    ruleInx: number;

    setLevel: (level: string, inx: number) => void;
    setRules: (rules: Rule[]) => void;
    selectRule: (inx: number) => void;

    createRule: (rule: Rule) => void;
    updateRule: (rule: Rule) => void;
    deleteRule: () => void;
}

export const createRulesSlice = (set: any, get: any): RulesSlice => ({
    levels: RuleLevels,
    rules: [],
    ruleInx: 0,
    level: 'Common',

    setLevel: (level: string, inx: number) => set((state: RulesSlice) => ({
        level,
        levelInx: inx + 1,
    })),

    setRules: (rules: Rule[]) => set({ rules }),
    selectRule: (inx: number) => set({ ruleInx: inx }),

    createRule: (rule: Rule) => set((state: RulesSlice) => ({
        rules: [...state.rules, rule],
    })),

    updateRule: (newRule: Rule) => set((state: RulesSlice) => ({
        rules: state.rules.map((el, inx) => inx === state.ruleInx ? newRule : el),
    })),

    deleteRule: () => set((state: RulesSlice) => ({
        rules: state.rules.filter((el, inx) => inx !== state.ruleInx),
    })),
});

/*
//rules: state.rules.map(el => el.id === state.ruleId ? newRule : el),
//rules: state.rules.filter(el => el.id !== state.ruleId),
rules: [
        {
            id: 'Easy',
            level: 'Common',
            parameter: 'Speed',
            condition: '>',
            value: 5,
            isPersonal: false,
            selection: '',
        },
        {
            id: 'Easy2',
            level: 'Common',
            parameter: 'Speed',
            condition: '>',
            value: 5,
            isPersonal: true,
            selection: 'max',
        },
    ],
*/