import { Camp, Group, Filters } from '../model';
import { EventsSlice } from './EventsSlice';
import { StateSlice } from '../state';
import { eventTypes } from '../../../shared/constants';


export interface FiltersSlice {
    camps: Camp[];
    camp_id: number;
    campInx: number;

    groups: Group[];
    group_id: number;
    
    year: number;
    month: number;

    isGame: boolean;
    isTest: boolean;
    isTraning: boolean;
    types: string[];

    setCamps: (camps: Camp[]) => void;
    setGroups: (groups: Group[]) => void;
    setDate: (year: number, month: number) => void;

    selectCamp: (id: number, inx: number) => void;
    selectGroup: (id: number) => void;
    selectDate: (year: number, month: number) => void;

    setIsGame: () => void;
    setIsTest: () => void;
    setIsTraning: () => void;
}

export const createFiltersSlice = (set: any, get: any): FiltersSlice => ({
    camps: [
        { id: 1, name: 'Camp 1' },
        { id: 2, name: 'Camp 2' },
        { id: 3, name: 'Camp 3' }
    ],
    camp_id: 0,
    campInx: -1,

    groups: [
        { id: 1, name: 'Group 1', camp_id: 1 },
        { id: 2, name: 'Group 2', camp_id: 1 },
        { id: 3, name: 'Group 3', camp_id: 1 }
    ],
    group_id: 0,
    
    year: 2025,
    month: 1,

    isGame: true,
    isTest: true,
    isTraning: true,
    types: eventTypes,

    setCamps: (camps: Camp[]) => set({ camps, camp_id: camps[0].id }),
    setGroups: (groups: Group[]) => set({ groups }),
    setDate: (year: number, month: number) => set({ year, month }),

    setIsGame: () => {
        const { isGame, camp_id, group_id, types, filterEvents }: FiltersSlice & EventsSlice = get();
        const updatedTypes: string[] = isGame ? types.filter((el) => el !== eventTypes[0]) : [...types, eventTypes[0]];
        const filters: Filters = { types: updatedTypes, camp: camp_id, group: group_id };
        filterEvents(filters);
        set((prevState: FiltersSlice) => ({ isGame: !prevState.isGame, types: updatedTypes }));
    },
    setIsTest: () => {
        const { isTest, camp_id, group_id, types, filterEvents }: FiltersSlice & EventsSlice = get();
        const updatedTypes: string[] = isTest ? types.filter((el) => el !== eventTypes[1]) : [...types, eventTypes[1]];
        const filters: Filters = { types: updatedTypes, camp: camp_id, group: group_id };
        filterEvents(filters);
        set((prevState: FiltersSlice) => ({ isTest: !prevState.isTest, types: updatedTypes }));
    },
    setIsTraning: () => {
        const { isTraning, camp_id, group_id, types, filterEvents }: FiltersSlice & EventsSlice = get();
        const updatedTypes: string[] = isTraning ? types.filter((el) => el !== eventTypes[2]) : [...types, eventTypes[2]];
        const filters: Filters = { types: updatedTypes, camp: camp_id, group: group_id };
        filterEvents(filters);
        set((prevState: FiltersSlice) => ({ isTraning: !prevState.isTraning, types: updatedTypes }));
    },

    selectCamp: (id: number, inx: number) => {
        const { loadLastEvent, loadGroups }: StateSlice = get();
        loadGroups(id);
        loadLastEvent(id);
        set({ camp_id: id, campInx: inx })
    },

    selectGroup: (id: number) => {
        const { camp_id, types, filterEvents }: FiltersSlice & EventsSlice = get();
        const filters: Filters = { types, camp: camp_id, group: id };
        filterEvents(filters);
        set({ group_id: id });
    },

    selectDate: (year: number, month: number) => {
        const { loadEvents, camp_id }: StateSlice & FiltersSlice = get();
        loadEvents(camp_id, year, month);
        set({ year, month });
    },
});


/*
    setDate: (year: number, month: number) => {
            const { student_id }: EventsSlice = get();
            const y = getYear(year, month);
            const m = getMonth(month);
    
            get_student_events(student_id, y, m, ( res => {
                if (res) {
                    set({ year: y, month: m,})
    
                    const { setTests }: TestsSlice = get();
                    const { setGames }: GamesSlice = get();
                    setTests(res.tests);
                    setGames(res.games);
                }
            }));
        }
*/
