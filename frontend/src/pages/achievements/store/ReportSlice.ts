import {  AchieveReport } from '../model';


export interface ReportSlice {
    report: AchieveReport;

    getAchieveReport: (id: number) => void;
}

export const createReportSlice = (set: any): ReportSlice => ({
    report: {
        earned: 200,
        percentage: 5,
        date: '2024-12-15',
        firstName: 'John',
        lastName: 'Doe',
    },

    getAchieveReport: (id: number) => ({
        achieves: [],
    }),
});

