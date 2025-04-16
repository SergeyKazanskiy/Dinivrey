export enum Exercise {
    Speed,
    Stamina,
    Climbing,
    Evasion,
    Hiding,
}

export interface Statictic {
    id: number;
    test_id: number;
    exercise: Exercise;
    score: number;
    additionally: string;
  }

  export interface TestResults {
    id: number;
    student_id: number;
    speed: number;
    stamina: number;
    climbing: number;
    evasion: number;
    hiding: number;
    date: number;
  }

