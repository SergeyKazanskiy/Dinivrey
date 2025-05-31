import { MetricsSlice } from './store/MetricsSlice';
import { add_initial_metrics, get_metrics, get_camps, delete_all_metric} from './http';
import { Metric, Camp } from './model';
import { objectToJson } from '../../shared/utils';


export interface StateSlice {
    loadMetrics: () => void;
    loadCamps: () => void;

    // Only once
    addInitialMetrics: () => void;
    deleteInitialMetrics: () => void;
}

export const createStateSlice = (set: any, get: any): StateSlice => ({

    loadMetrics: () => {
        
        get_metrics((metrics: Metric[]) => {
           // alert(objectToJson(metrics))
           // if (metrics.length === 0) {get().add_initial_metrics()} // only first time, becose it clears all tabels
            const { setMetrics }: MetricsSlice = get();
            setMetrics(metrics);
        })
    },

    loadCamps: () => {
        get_camps((camps: Camp[]) => {
            const { setCamps }: MetricsSlice = get();
            setCamps(camps);
        })
    },

    // Only once
    addInitialMetrics: () => {
        add_initial_metrics({test:'Speed', camp_id: 0}, (res) => {
            add_initial_metrics({test:'Stamina', camp_id: 1}, (res) => {
                add_initial_metrics({test:'Stamina', camp_id: 2}, (res) => {
                     add_initial_metrics({test:'Climbing', camp_id: 1}, (res) => {
                        add_initial_metrics({test:'Climbing', camp_id: 2}, (res) => {
                             alert('All initial metrics are added')
                        });
                     });
                });
            });
        }); 
    },

    deleteInitialMetrics: () => {
        delete_all_metric((res) => {
            alert('All initial metrics are deleted')
        });
    }
});
