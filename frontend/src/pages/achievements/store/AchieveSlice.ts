import { effectNames } from '../../../shared/constants';
import { Achieve, AchieveShort, Rule } from '../model';
import { create_achieve, add_rules, update_achieve, replace_rules } from '../httpClient';
import { objectToJson } from '../../../shared/utils';
import axios, {AxiosError} from 'axios';
import { RulesSlice } from './RulesSlice';


export interface AchieveSlice {
    id: number;
    image: string;
    name: string;
    desc: string;
    hasRules: boolean;
    category: string;
    trigger: string;
    effect: string;

    setImage: (image: string) => void;
    setName: (name: string) => void;
    setDesc: (desc: string) => void;
    setHasRules: (hasRules: boolean) => void;
    setCategery: (category: string) => void;
    setTrigger: (trigger: string) => void;
    setEffect: (effect: string, index: number) => void;

    setAchieve: (achieve: Achieve) => void;
    saveAchieve:() => void;
}

export const createAchieveSlice = (set: any, get: any): AchieveSlice => ({
    id: 0,
    image: 'medal',
    name: 'Enter',
    desc: '',
    hasRules: false,
    category: 'test',
    trigger: 'Manual',
    effect: '',  

    setImage: (image: string) => set({ image }),
    setName: (name: string) => set({ name }),
    setDesc: (desc: string) => set({ desc }),
    setHasRules: (hasRules: boolean) => set({ hasRules }),
    setCategery: (category: string) => set({ category }),
    setTrigger: (trigger: string) => set({ trigger }),
    setEffect: (effect: string) => set({ effect }),

    setAchieve: (achieve: Achieve) => set({ 
        image: achieve.image,
        name: achieve.name,
        desc: achieve.desc,
        hasRules: achieve.hasRules,
        category: achieve.category,
        trigger: achieve.trigger,
        effect: achieve.effect,
    }),
    
    saveAchieve: () => {
        const {achieveId, image, name, desc, hasRules, category, trigger, effect, addAchieve, updateAchieve } = get();
        const achieve: Achieve = {image, name, desc, hasRules, category, trigger, effect};
        //alert(objectToJson(achieve))
        if (achieveId === 0) {
            create_achieve(achieve, (res) => {
                 const achieveShort: AchieveShort = {
                    id: res.id,
                    name: achieve.name,
                    image: achieve.image,
                    category: achieve.category
                 }
                addAchieve(achieveShort)
                if (achieve.hasRules) {
                    const state: RulesSlice = get();
                    const newRules = state.rules.map(rule => ({ ...rule, achieve_id: res.id }));
                    add_rules(newRules, (res) => {});
                } 
                set({ achieveId: 0, ruleInx: 0 });
           })
        } else {
            update_achieve(achieveId, achieve, (res) => {
                const achieveShort: AchieveShort = {
                    id: achieveId,
                    name: achieve.name,
                    image: achieve.image,
                    category: achieve.category
                 }
                updateAchieve(achieveId, achieveShort);
                if (achieve.hasRules) {
                    const state: RulesSlice = get();
                    const newRules = state.rules.map(rule => ({ ...rule, achieve_id: achieveId}))
                    replace_rules(achieveId, newRules, (res) => {})
                };
                set({ achieveId: 0, ruleInx: 0 });
            }) 
        }
    },
});

/*
 axios.post('http://localhost:8000/admin_api/camps', {
                name: "alpinism",
                city: 'city1'
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
*/