export enum Exercise {
    Speed = 'Speed',
    Stamina = 'Stamina',
    Climbing = 'Climbing',
    Evasion = 'Evasion',
    Hiding = 'Hiding',
}

export interface Group {
    id: number;
    title: string;
}

export interface Student {
    id: number;
    imagePath: string;
    firstName: string;
    lastName: string;
    achievements: Achievement[];
    statistic: Statistic[];
    average: number;
}

export interface Statistic {
    student_id: number;
    exercise: Exercise;
    mark: number;
}

export interface Achievement {
    student_id: number;
    imageName: string;
}
