import { Drill } from '../model';
import { get_drill } from '../http';
import { objectToJson } from '../../../../shared/utils';


export interface DrillSlice {
    drill: Drill;

    loadDrill: (drill_id: number) => void;
}

export const createDrillSlice = (set: any, get: any): DrillSlice => ({
    drill: {
        id: 0,
        name: 'Super',
        time: '10 min',
        level: 'elementary',
        link: 'ENNyjfTlAno',
        desc: 'Enter description'
    },

    loadDrill: (drill_id: number) => {
        //alert(objectToJson(drill_id))
        get_drill(drill_id, (drill => {
            set({drill});
        }));
    },

});

