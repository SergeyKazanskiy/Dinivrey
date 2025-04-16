import {  AchieveImages } from '../../../shared/constants';
//import { Store } from '../store';



export interface GifsSlice {
    gifs: string[];
    gifInx: number;

    addGif: () => void;
    removeGif: (inx: number) => void;
}

export const createGifsSlice = (set: any): GifsSlice => ({
    gifs: AchieveImages,
    gifInx: 0,

    addGif: () => set((state: any) => ({
        
    })),

    removeGif: (inx: number) => set((state: any) => ({
        
    })),
});
