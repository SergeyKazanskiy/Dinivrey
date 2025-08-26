import {  Rule } from '../model';
import { RuleLevels } from '../../../shared/constants';
import { objectToJson } from '../../../shared/utils';


export interface RulesSlice {
    levels: string[];
    level: string;
    levelInx: number;

    rules: Rule[];
    ruleId: number;
    isAnd: boolean;

    setLevel: (level: string, inx: number) => void;
    setRules: (rules: Rule[]) => void;
    selectRule: (id: number) => void;

    createRule: (rule: Rule) => void;
    updateRule: (rule: Rule) => void;
    deleteRule: () => void;

    setLogic:(isAnd: boolean) => void;
}

export const createRulesSlice = (set: any, get: any): RulesSlice => ({
    levels: RuleLevels,
    level: 'Common',
    levelInx: 1,

    rules: [],
    ruleId: 0,
    
    isAnd: true,

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
        // const { rules }: RulesSlice = get();
        // alert(objectToJson(rules))

        set({ ruleId: id });
    },

    createRule: (rule: Rule) => set((state: RulesSlice) => ({
        rules: [...state.rules, rule],
        isAchieveChanged: true
    })),

    updateRule: (newRule: Rule) => set((state: RulesSlice) => ({
        rules: state.rules.map(el => el.id === state.ruleId ? newRule : el),
        isAchieveChanged: true
    })),

    deleteRule: () => set((state: RulesSlice) => ({
        rules: state.rules.filter(el => el.id !== state.ruleId),
        isAchieveChanged: true
    })),

    setLogic:(isAnd: boolean) => set((state: RulesSlice) => ({
        isAnd,
        rules: state.rules.map(el => el.level === state.levelInx ? {...el, type: isAnd ? 'AND' : 'OR'} : el),
        isAchieveChanged: true
    })),
});
