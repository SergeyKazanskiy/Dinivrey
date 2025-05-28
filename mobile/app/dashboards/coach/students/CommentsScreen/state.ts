import { Comment } from "../model";
import { GroupsSlice } from '../GroupsScreen/state';
import { get_student_coach_comments } from '../http';


export interface CommentsSlice {
    comments: Comment[];
    
    loadComments: () => void;
}

export const createCommentsSlice = (set: any, get: any): CommentsSlice => ({     
    comments: [],

    loadComments: ( ) => {
        const { student_id }: GroupsSlice = get()

        get_student_coach_comments(student_id, (comments: Comment[]) => {
            set({comments})
        })
    },
});
