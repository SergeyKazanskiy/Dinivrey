import { Manager } from '../model';
import { create_manager, update_manager, delete_manager } from '../http';
import { objectToJson } from '../../../shared/utils';
import { CampsSlice } from './CampsSlice';


export interface ManagersSlice {
    managers: Manager[];
    manager_id: number;

    setManagers: (managers: Manager[]) => void;
    selectManager: (manager_id: number) => void;

    createManager: () => void;
    updateManager: (data: Partial<Manager>) => void; 
    deleteManager: () => void;
}

export const createManagersSlice = (set: any, get: any): ManagersSlice => ({
    managers: [],
    manager_id: 0,

    setManagers: (managers: Manager[]) => set({ managers }),

    selectManager: (manager_id: number) => set({ manager_id }),

    createManager: () => {
        const { camp_id }: ManagersSlice & CampsSlice = get();
        const data: Omit<Manager, 'id'> = { camp_id, first_name: '', last_name: '', phone: ''}

        create_manager(data, (res => {
            if (res) {
                const newManager: Manager = {...data, id: res.id};
                set((state: ManagersSlice) => ({ managers: [...state.managers, newManager] }));
            }
        }));
    },

    updateManager: (data: Partial<Manager>) => {
        const { manager_id }: ManagersSlice = get();

        update_manager(manager_id, data, (res => {
            if (res.isOk) {
                set((state: ManagersSlice) => ({
                    managers: state.managers.map(el => el.id === manager_id ? {...el, ...data} : el ),
                }));
            }
        }));
    },

    deleteManager: () => {
        const { manager_id }: ManagersSlice = get();
        
        delete_manager(manager_id, (res => {
            if (res.isOk) {
                set((state: ManagersSlice) => ({
                    manager_id: 0,
                    managers: state.managers.filter(el => el.id !== manager_id),
                }));
            }
        }));
    },
});