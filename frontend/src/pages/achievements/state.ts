import {  AchieveShort, Achieve } from './model';
import { get_achieves, get_achieve, delete_achieve, get_rules } from './httpClient';
import { api } from '../../api/api';
import axios, {AxiosError} from 'axios';
import { RulesSlice } from './store/RulesSlice';
import { AchieveSlice } from './store/AchieveSlice';
import { objectToJson } from '../../shared/utils';


export interface StateSlice {
    achieves: AchieveShort[];
    achieveId: number;
    isEditorOpened: boolean;
    isReportShown: boolean;
    category: string;

    isAchieveChanged: boolean;
    isBackAlert: boolean;

    selectAdd: (category: string) => void;
    selectAchieve: (id: number, category: string) => void;
    deleteAchieve: (achieveId: number) => void;
    addAchieve: (achieve: AchieveShort) => void;
    updateAchieve: (id: number, achieve: AchieveShort) => void;

    loadAchieves: () => void;
    closeAchieveView: () => void;
    showReportView: () => void;
    hideBackAlert: () => void;
}

export const createStateSlice = (set: any, get: any): StateSlice => ({
    achieves: [],
    achieveId: 0,
    isEditorOpened: false,
    isReportShown: false,
    category: 'Test',

    isAchieveChanged: false,
    isBackAlert: false,


    selectAchieve: (id: number, category: string) => {
        const {achieveId, isEditorOpened, isAchieveChanged, setAchieve, setRules}: StateSlice & RulesSlice & AchieveSlice = get();

        if (achieveId === id && isEditorOpened) {
            set(() => ({ isEditorOpened: false, achieveId: 0, achieveInx: -1 }));
        } else if (achieveId > 0 && isAchieveChanged) {
            set({isBackAlert: true});
        } else {
            get_achieve(id, (achieve) => {
                setAchieve(achieve);

                if (achieve.hasRules) {
                    get_rules(id, (rules)=> {
                        //alert(objectToJson(rules))
                        setRules(rules);
                    })
                } else {
                    setRules([]);
                }
                //alert(category)
                set({ isEditorOpened: true, achieveId: id, category });
            })
        }
    },

    selectAdd: (category: string) => {
        const achieve = { 
            image: 'medal',
            name: 'Enter',
            desc: 'Enter description',
            hasRules: false,
            category: category,
            trigger: 'Automatic',
            effect: 'jump',
        }
        const {setAchieve, setRules} = get();
        setRules([]);
        setAchieve(achieve);
        set(() => ({ isEditorOpened: true, }))
    },

    addAchieve: (achieve: AchieveShort) => {
        const achieves: AchieveShort[] = get((state: StateSlice)=>state.achieves);
        set((state: StateSlice) => ({
            achieves: [...state.achieves, achieve],
            isEditorOpened: false,
            //achieveId: achieve.id, 
            achieveId: 0,
        }))
    },

    updateAchieve: (id: number, achieve: AchieveShort) => {
        set((state: StateSlice) => ({
            achieves: state.achieves.map(el => el.id === id ? achieve : el),
            isEditorOpened: false,
        }))
    },

    deleteAchieve: (achieveId: number) => {
        delete_achieve(achieveId, (isOk) => {
            set((state: StateSlice) => ({
                achieves: state.achieves.filter(el => el.id !== achieveId),
                isEditorOpened: false, achieveId: 0,
            }))
        })
    },

    loadAchieves: () => {
        get_achieves((achieves: AchieveShort[]) => {
            set(() => ({ achieves}));
        })
    },

    closeAchieveView: () => set({ isEditorOpened: false,  achieveId: 0, isAchieveChanged: false, isBackAlert: false }),
    showReportView: () => set((state: any) => ({isReportShown: !state.isReportShown})),
    hideBackAlert: () => set({isBackAlert: false})
});


/*
if (shouldClose && hasChanges) {
    openSaveAlert()
}
if (!needClose) { //Alert
    get_achieve(id, (achieve: Achieve) => {
        setAchieve(achieve)
    })
        {
            id: 2,
            image: 'medal',
            name: 'First',
            desc: 'Desc1',
            hasRules: false,
            category: 'Test',
            trigger: 'Automatic',
            effect: 'pulse',
        },
        {
            id: 3,
            image: 'award',
            name: 'Second',
            desc: 'Desc2',
            hasRules: true,
            category: 'Test',
            trigger: 'Manual',
            effect: 'jump',
        }
};*/