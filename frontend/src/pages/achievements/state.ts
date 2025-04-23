import {  AchieveShort, Achieve } from './model';
import { get_achieves, get_achieve, delete_achieve, get_rules } from './httpClient';
import { api } from '../../api/api';
import axios, {AxiosError} from 'axios';


export interface StateSlice {
    achieves: AchieveShort[];
    achieveId: number;
    isEditorOpened: boolean;
    isReportShown: boolean;

    selectAdd: (category: string) => void;
    selectAchieve: (id: number, inx: number) => void;
    deleteAchieve: (achieveId: number) => void;
    addAchieve: (achieve: AchieveShort) => void;
    updateAchieve: (id: number, achieve: AchieveShort) => void;

    loadAchieves: () => void;
    closeAchieveView: () => void;
    showReportView: () => void;
}

export const createStateSlice = (set: any, get: any): StateSlice => ({
    achieves: [],
    achieveId: 0,
    isEditorOpened: false,
    isReportShown: false,

    selectAchieve: (id: number, inx: number) => {
        const {achieveId, isEditorOpened, setAchieve, setRules} = get();
        if (achieveId === id && isEditorOpened) {
            set(() => ({ isEditorOpened: false, achieveId: 0 }));
        } else {
            get_achieve(id, (achieve) => {
                setAchieve(achieve);
                if (achieve.hasRules) {
                    get_rules(id, (rules)=> {
                        setRules(rules)
                    })
                }
                set(() => ({ isEditorOpened: true, achieveId: id }));
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

    closeAchieveView: () => set({ isEditorOpened: false,  achieveId: 0 }),
    showReportView: () => set((state: any) => ({isReportShown: !state.isReportShown})),
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