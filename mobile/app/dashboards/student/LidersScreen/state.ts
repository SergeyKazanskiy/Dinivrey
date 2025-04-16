import { AxiosError } from "axios";
import { Store } from "../store";
import { api } from "../../../shared/httpClient";
import { Exercise, Group, Student } from "./model";
import { TestStudents } from "./test";


export interface LidersState {
    liderGroups: Group[];
    liderStudents: Student[];
    sortedLiders: Student[];

    searchActive: boolean;
    searchPhrase: string;
    currentExercise: Exercise;

    get_lider_groups: () => void; // camp_id?
    get_lider_students: (group_id: number) => void;

    setSearchActive: (isActive: boolean) => void;
    setSearchPhrase: (phrase: string) => void;
    setExercise: (isActive: boolean) => void;
}

export const createLidersState = (set: any, get: () => Store): LidersState => ({
    liderGroups: [],
    liderStudents: TestStudents,
    sortedLiders: TestStudents,

    currentExercise: Exercise.Climbing,
    searchPhrase: "",
    searchActive: false,


    get_lider_groups: () => {

    },

    get_lider_students: (group_id: number) => {

    },

    setSearchActive: (isActive: boolean) => {

    },

    setSearchPhrase: (phrase: string) => {

    },

    setExercise: (isActive: boolean) => {

    },
});
