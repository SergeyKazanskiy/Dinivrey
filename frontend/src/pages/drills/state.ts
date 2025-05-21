import { DrillSlice } from './store/DrillSlice';
import { DrillsSlice } from './store/DrillsSlice';
import { get_drills} from './http';
import { ShortDrill } from './model';
import { objectToJson } from '../../shared/utils';


export interface StateSlice {
    isModal: boolean;
    isAdd: boolean;
    isDelete: boolean;

    loadDrills: () => void;
    openAddModal: () => void;
    openDeleteModal: () => void;
    closeModal: () => void;
}

export const createStateSlice = (set: any, get: any): StateSlice => ({
    isModal: false,
    isAdd: false,
    isDelete: false,

    loadDrills: () => {
        get_drills((drils: ShortDrill[]) => {
            //alert(objectToJson(drils))
            const { setDrills, clearDrill }: DrillsSlice & DrillSlice = get();
            setDrills(drils);
            clearDrill();
        })
    },

    openAddModal: () => {
        const { unselectDrill, clearDrill }: DrillsSlice & DrillSlice = get();
        clearDrill();
        unselectDrill();
        set({ isModal: true, isAdd: true, isDelete: false })
    },

    openDeleteModal: () => set({ isModal: true, isAdd: false, isDelete: true }),
    closeModal: () => set({ isModal: false, isAdd: false, isDelete: false }),
});
