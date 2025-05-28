import { Event } from "../model";
import { HistorySlice } from '../HistoryScreen/state';
import { get_coach_competitions } from '../http';


export interface CompetitionsSlice {
    competitions: Event[];
    
    loadCompetitions: () => void;
}

export const createCompetitionsSlice = (set: any, get: any): CompetitionsSlice => ({     
    competitions: [],

    loadCompetitions: ( ) => {
        const { group_ids }: HistorySlice = get()

        get_coach_competitions(group_ids, (competitions: Event[]) => {
            set({competitions})
        })
    },
});
