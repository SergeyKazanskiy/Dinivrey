import { Drill, ShortDrill } from '../model';
import { StateSlice } from '../state';
import { DrillSlice } from './DrillSlice';
import { get_drill, add_drill, update_drill, delete_drill } from '../http';
import { objectToJson } from '../../../shared/utils';


export interface DrillsSlice {
    drills: ShortDrill[];

    column: string;
    drill_id: number;
    
    setColumn: (column: string) => void;
    setDrills: (drills: ShortDrill[]) => void;
    selectDrill: (drill_id: number, column: string) => void;
    unselectDrill:() => void;

    addDrill: () => void;
    updateDrill: (value: string) => void;
    deleteDrill: () => void;
}

export const createDrillsSlice = (set: any, get: any): DrillsSlice => ({
    drills: [],
 
    column: '',
    drill_id: 0,

    setColumn: (column: string) => set({column}),

    setDrills: (drills: ShortDrill[]) => {
        //alert(objectToJson(drills))
        set({ drills, drill_id: 0 })
        const { clearDrill }: DrillSlice = get();
        clearDrill();
    },

    selectDrill: (drill_id: number, column: string) => {
        get_drill(drill_id, (drill => {
            set({ drill_id, column});
       
            const { setName, setLink, setDesc }: DrillSlice = get();
            setName(drill.name);
            setLink(drill.link);
            setDesc(drill.desc);
        }));
    },

    unselectDrill:() => set({ drill_id: 0, column: '' }),

    addDrill: () => {
        const { getNewDrill }: DrillSlice = get();
        const newDrill: Omit<Drill, 'id'> = getNewDrill();
        //alert(objectToJson(newEvent));
        add_drill(newDrill, (res) => {
            if (res.id) {
                const drill: Drill = {...newDrill, id: res.id};
                set((state: DrillsSlice) => ({ drills: [...state.drills, drill] }));
            }     
        })
        const { closeModal }: StateSlice = get();
        closeModal();
    },

    deleteDrill: () => {
        const { drill_id, clearDrill, closeModal}: DrillSlice & DrillsSlice & StateSlice = get();
        //alert(event_id)
        delete_drill(drill_id, (res => {
            if (res.isOk) {
                set((state: DrillsSlice) => ({
                    drills: state.drills.filter(el => el.id !== drill_id),
                }));
                clearDrill();
            }
        }));
        closeModal();
    },

    updateDrill: (value: string) => {
        const { drill_id, column }: DrillsSlice = get();

        update_drill(drill_id, {[column]: value}, (res) => {
            if (res.isOk) {
                if (column === 'name' || column === 'time' || column === 'level') {
                    set((state: DrillsSlice) => ({
                        drills: state.drills.map(el => el.id !== drill_id ? el : {...el, [column]: value}),
                    }));
                }
            }
        });
    },
});

