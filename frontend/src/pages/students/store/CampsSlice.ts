import { Camp } from '../model';
import { create_camp, delete_camp, update_camp } from '../http';
import { GroupsSlice } from './GroupsSlice';
import { StateSlice } from '../state';
import { getChanges } from '../../../shared/utils';


export interface CampsSlice {
    camps: Camp[];
    camp_id: number;

    setCamps: (camps: Camp[]) => void;
    selectCamp: (id: number) => void;

    createCamp: () => void;
    updateCamp: (name: string, city: string) => void;
    deleteCamp: () => void; 
}

export const createCampsSlice = (set: any, get: any): CampsSlice => ({
    camps: [
        { id: 1, name: 'Camp 1', city: 'City 1' },
        { id: 2, name: 'Camp 2', city: 'City 2' },
        { id: 3, name: 'Camp 3', city: 'City 3' }
    ],
    camp_id: 0,
   
    setCamps: (camps: Camp[])  => set({ camps, camp_id: 0 }),

    selectCamp: (id: number) => {
        const { camp_id }: CampsSlice = get();
        if (id !== camp_id) {
            set({ camp_id: id });
            const { loadGroups }: StateSlice = get();
            loadGroups(id);
        } 
    },

    createCamp: () => {
        const { camps }: CampsSlice = get();
        const name: string = 'Camp ' + (camps.length + 1)
        const newCamp: Omit<Camp, 'id'> = { name, "city": 'enter' };
        create_camp({"name": name, "city": 'enter'}, (res)=> {
            if (res.id) {
                const id = res.id;
                set((state: CampsSlice) => ({
                    camps: [...state.camps, {...newCamp, id}]
                }));
                const { selectCamp }: CampsSlice = get();
                selectCamp(id)
            };
        });
    },

    updateCamp: (name: string, city: string) => {
        const { camps, camp_id }: CampsSlice = get();
        const updatedCamp: Omit<Camp, 'id'> = { name, city };
        const camp = camps.find(camp => camp.id === camp_id)!
        const data = getChanges(camp, updatedCamp);

        update_camp(camp_id, data, (res)=> {
            if (res.isOk) {
                set((state: CampsSlice) => ({
                    camps: state.camps.map((el) => el.id ===  camp_id ? { ...el, name, city } : el),
                }));
            };
        });
    },

    deleteCamp: () => {
        const { camp_id, groups }: CampsSlice & GroupsSlice = get();
        if (groups.length > 0) {
            alert('Cannot be deleted because there are groups in the camp')
        } else {
            delete_camp(camp_id, (res) => {
                if (res.isOk) {
                    set((state: CampsSlice) => ({
                        camps: state.camps.filter(el => el.id !== camp_id),
                        camp_id: 0
                    }))
                }
            })
        }
    },
});