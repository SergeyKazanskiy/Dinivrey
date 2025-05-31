import { Metric } from '../model';
import { update_metric } from '../http';
import { objectToJson } from '../../../shared/utils';
import { Camp } from '../../achievements/model';


export interface MetricsSlice {
    metrics: Metric[];
    metric_id: number;

    camps: Camp[];
    camp_id: number;

    setMetrics: (metrics: Metric[]) => void;
    setCamps: (camps: Camp[]) => void;
    selectCamp: (camp_id: number) => void;

    updateStart: (metric_id: number, value: number ) => void;
    updateStop: (metric_id: number, value: number ) => void;
    updateMetric: (metric_id: number, data: Partial<Metric>) => void;
}

export const createMetricsSlice = (set: any, get: any): MetricsSlice => ({
    metrics: [],
    metric_id: 0,

    camps: [],
    camp_id: 1,

    setMetrics: (metrics: Metric[]) => set({metrics}),
    setCamps: (camps: Camp[]) => set({camps}),
    selectCamp: (camp_id: number) => set({camp_id}),

    updateStart: (metric_id: number, value: number) => {
        const { updateMetric }: MetricsSlice = get();
        updateMetric( metric_id, {'start' : value})
    },

    updateStop: (metric_id: number, value: number) => {
        const { updateMetric }: MetricsSlice = get();
        updateMetric( metric_id, {'stop' : value})
    },

    updateMetric: (metric_id: number, data: Partial<Metric>) => {
        update_metric(metric_id, data, (res) => {
            if (res.isOk) {
                set((state: MetricsSlice) => ({
                    metrics: state.metrics.map(el => el.id !== metric_id ? el : {...el, ...data}),
                }));
            }
        });
    },
});

