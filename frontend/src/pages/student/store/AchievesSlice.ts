import { Achieve, AchieveAttach } from '../model';
import { attach_achieve, detach_achieve, get_student_achieves } from '../http';


export interface AchievesSlice {
    studentAchieves: Achieve[];
    baseAchieves: Achieve[];
    achieve_id: number;
    category: string;

    canUpdate: boolean;
    canDelete: boolean;

    setAchieves:(achieves: Achieve[]) => void; //StateSlice onDownload student
    selectAchieve:(achieve_id: number) => void; //AchievesPanel For further possibility of deletion 

    attachAchieve:(base_achieve_id: number) => void; //AchievesModal attach BaseAchieve to the student (manual-trigger)   
    detachAchieve: () => void; //AchievesPanel detach selected in AchievesPanel achieve (manual-trigger)
    updateAchieves:() => void; //AchievesPanel UpdateButton for auto-trigger (need after change test or game exams to check the students achieves)
}

export const createAchievesSlice = (set: any, get: any): AchievesSlice => ({
    baseAchieves: [],
    studentAchieves: [
        {
            id: 0,
            student_id: 0,
            image: 'Climbing.png', 
            level: 'Common',
            name: "First",
            effect: "fade",
            category: "Test",
        }
    ],
    achieve_id: 0,
    category: '',
    canUpdate: false,
    canDelete: false,

    setAchieves:(studentAchieves: Achieve[]) => set({ studentAchieves }),
    selectAchieve:(achieve_id: number) => set({ achieve_id }),

    attachAchieve:(base_achieve_id: number) => {
        const { student_id } = get();
        const data: AchieveAttach = {
            student_id,
            achieve_id: base_achieve_id,
            desc: ''
        }

        attach_achieve(data, (achieve => {
            if (achieve) {
                set((state: AchievesSlice) => ({
                    studentAchieves: [...state.studentAchieves, achieve],
                }));
            }
        }))
    },

    detachAchieve:() => {
        const { student_id, achieve_id } = get();

        detach_achieve(student_id, achieve_id, (res => {
            if (res) {
                set((state: AchievesSlice) => ({
                    studentAchieves: state.studentAchieves.filter(el => el.id !== achieve_id),
                    achieve_id: 0,
                }));
            }
        }))
    },

    updateAchieves:() => {
        const { student_id } = get();
        get_student_achieves(student_id, (achieves => {
            set({ achieves })
        }))
    },
});