import { ShortDrill, EventDrill, ShortEventDrill } from '../model';
import { get_drills, attach_drill, detach_drill, get_event_drills, update_event_drill } from '../http';
import { objectToJson } from '../../../../shared/utils';
import { EventsSlice } from '../EventsScreen/state';


export interface DrillsSlice {
    eventDrills: ShortEventDrill[];
    eventDrill_id: number;

    isDrillsModal: boolean;
    drills: ShortDrill[];

    loadEventDrills: () => void;
    loadDrills: () => void;

    attachDrill: (drill_id: number) => void;
    detachDrill: (drill_id: number) => void;

    openDrillsModal: () => void;
    closeDrillsModal: () => void;

    updateEventDrill: (eventDrill_id: number, completed: boolean) => void;
}

export const createDrillsSlice = (set: any, get: any): DrillsSlice => ({
    eventDrills: [],
    eventDrill_id: 0,

    isDrillsModal: false,
    drills: [],
    

    loadEventDrills: () => {
        const { event_id }: EventsSlice = get();
        
        get_event_drills(event_id, (eventDrills => {
            set({eventDrills});
        }));
    },

    loadDrills: () => {
        get_drills((baseDrils => {
            alert(objectToJson(baseDrils))
            const { eventDrills }:DrillsSlice =  get();
            const drills = baseDrils.map(el => ({...el, present: checkPresentDrill(eventDrills, el.id)}));
            set({drills});
        }));
    },

    attachDrill: (drill_id: number) => {
        const { event_id }: EventsSlice = get();
        const data: Omit<EventDrill, 'id'> = {
            event_id,
            drill_id,
            completed: false
        }
        attach_drill(data, (res => {
            if (res) {
                const { drills }:DrillsSlice =  get();
                const drill = drills.find(el => el.id === drill_id)!
                const eventDrill: ShortEventDrill = {
                    id: res.id,
                    drill_id,
                    name: drill.name,
                    time: drill.time,
                    level: drill.level,
                    category: drill.category,
                    actors: drill.actors,
                    completed: false
                }
                set((state: DrillsSlice) => ({
                    drills: state.drills.map(el => el.id === drill_id ? {...el, present: true} : el),
                    eventDrills: [...state.eventDrills, eventDrill]
                }));
            }     
        }));
    },

    detachDrill: (drill_id: number) => {
        detach_drill(drill_id, (res => {
            if (res.isOk) {
                set((state: DrillsSlice) => ({
                    drills: state.drills.map(el => el.id === drill_id ? {...el, present: false} : el),
                    eventDrills: state.eventDrills.filter(el => el.id !== drill_id),
                }));
            }
        }));
    },

    openDrillsModal: () => {
        const { loadDrills }: DrillsSlice =  get();
        loadDrills();
        set({isDrillsModal: true})
    },

    closeDrillsModal: () => set({
        isDrillsModal: false,
        drills: [],
        drill_id: 0
    }),

    updateEventDrill: (eventDrill_id: number, completed: boolean) => {
        
        update_event_drill(eventDrill_id, {completed}, (res => {
            if (res.isOk) {
                set((state: DrillsSlice) => ({
                    eventDrills: state.eventDrills.map(el => el.id === eventDrill_id ? {...el, completed} : el),
                }));
            }
        }))
    }
});

function checkPresentDrill(eventDrills: ShortEventDrill[], drill_id: number): boolean {

    for (let eventDrill of eventDrills) {
        if (eventDrill.drill_id === drill_id) return true;
    }
    return false
}