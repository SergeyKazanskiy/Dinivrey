import {  Rule } from '../model';
import { RuleLevels } from '../../../shared/constants';
import { objectToJson } from '../../../shared/utils';


export interface RulesSlice {
    levels: string[];
    level: string;
    rules: Rule[];
    ruleId: number;

    setLevel: (level: string, inx: number) => void;
    setRules: (rules: Rule[]) => void;
    selectRule: (id: number) => void;

    createRule: (rule: Rule) => void;
    updateRule: (rule: Rule) => void;
    deleteRule: () => void;
}

export const createRulesSlice = (set: any, get: any): RulesSlice => ({
    levels: RuleLevels,
    rules: [],
    ruleId: 0,
    level: 'Common',

    setLevel: (level: string, inx: number) => set((state: RulesSlice) => ({
        level,
        levelInx: inx + 1,
    })),

    setRules: (rules: Rule[]) => {
        set({ rules });

        const { setLevel }: RulesSlice = get();
        setLevel('Common', 0);
    },

    selectRule: (id: number) => {
        //alert(id)
        set({ ruleId: id });
    },

    createRule: (rule: Rule) => set((state: RulesSlice) => ({
        rules: [...state.rules, rule],
    })),

    updateRule: (newRule: Rule) => set((state: RulesSlice) => ({
        rules: state.rules.map(el => el.id === state.ruleId ? newRule : el),
    })),

    deleteRule: () => set((state: RulesSlice) => ({
        rules: state.rules.filter(el => el.id !== state.ruleId),
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