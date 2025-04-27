import { Achievement, Achieve, AchieveAttach } from '../model';
import { attach_achieve, detach_student_achieve, get_student_achieves, update_student_achieve } from '../http';
import { RuleLevels } from '../../../shared/constants';
import { StateSlice } from '../state';
import { backIn } from 'framer-motion';


export interface AchievesSlice {
    studentAchieves: Achievement[];
    baseAchieves: Achieve[];

    achieve_id: number;
    achievement_id: number;

    category: string;
    updateButtonTitle: string;

    setStudentAchieves:(studentAchieves: Achievement[]) => void; //StateSlice onDownload student
    setBaseAchieves:(baseAchieves: Achieve[]) => void; //StateSlice onDownload student

    selectAchieve:(achieve_id: number) => void; //AchievesPanel For further possibility of deletion 
    selectAchievement:(achievement_id: number) => void;

    attachAchieve:(base_achieve_id: number) => void; //AchievesModal attach BaseAchieve to the student (manual-trigger)   
    detachAchieve: () => void; //AchievesPanel detach selected in AchievesPanel achieve (manual-trigger)
    attachProfileAchieve: () => void;
    updateAchieves:() => void; //AchievesPanel UpdateButton for auto-trigger (need after change test or game exams to check the students achieves)
}

export const createAchievesSlice = (set: any, get: any): AchievesSlice => ({
    baseAchieves: [],
    studentAchieves: [],

    achieve_id: 0,
    achievement_id: 0,

    category: '',
    updateButtonTitle: 'Add to profile',
    

    setStudentAchieves:(studentAchieves: Achievement[]) => set({ studentAchieves }),
    setBaseAchieves:(baseAchieves: Achieve[]) => set({ baseAchieves }),

    selectAchieve:(achieve_id: number) => set((state: AchievesSlice) => ({
         achieve_id: state.achieve_id === achieve_id ? 0 : achieve_id,
         achievement_id: 0,
         updateButtonTitle: state.achieve_id === achieve_id ? 'Update' : 'Add to profile'
    })),

    selectAchievement:(achievement_id: number) => set((state: AchievesSlice) => ({
        achievement_id: state.achievement_id === achievement_id ? 0 : achievement_id,
        achieve_id: 0,
        updateButtonTitle: state.achievement_id === achievement_id ? 'Update' : 'Remove from profile'
   })),

    attachAchieve:(achieve_id: number) => {
        set({ isBaseAchieves: false });

        const { student_id }: StateSlice = get();
        const data: AchieveAttach = { student_id, achieve_id, level: RuleLevels[0], in_profile: false }

        attach_achieve(data, (achievement => {
            if (achievement) {
                set((state: AchievesSlice) => ({
                    studentAchieves: [...state.studentAchieves, achievement],
                }));
            }
        }))
    },

    detachAchieve:() => {
        const { achieve_id }: AchievesSlice = get();
       
        detach_student_achieve(achieve_id, (res => {
            if (res.isOk) {
                set((state: AchievesSlice) => ({
                    studentAchieves: state.studentAchieves.filter(el => el.id !== achieve_id),
                    achieve_id: 0,
                }));
            }
        }))
    },

    attachProfileAchieve:() => {
        const { studentAchieves, achieve_id, achievement_id }: AchievesSlice = get();
        const achieveId = achieve_id > 0 ? achieve_id : achievement_id;
        const achieve = studentAchieves.find(el => el.id === achieveId);

        if (achieve) {
            const inProfile = !achieve.in_profile;
            const data: Partial<Achievement> = { in_profile: inProfile};

            update_student_achieve(achieveId, data, (res => {
                if (res.isOk) {
                    achieve.in_profile = inProfile;
                    set((state: AchievesSlice) => ({
                        studentAchieves: state.studentAchieves.map(el => el.id !== achieve_id ? el : achieve ),
                        achieve_id: 0,
                        updateButtonTitle: 'Update'
                    }));
                }
            }))
        } else {
            alert('Error!')
        }
    },

    updateAchieves:() => {
        const { student_id } = get();
        get_student_achieves(student_id, (achieves => {
            set({ achieves })
        }))
    },
});

