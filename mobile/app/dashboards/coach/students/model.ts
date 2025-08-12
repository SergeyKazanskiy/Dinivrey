export interface Camp {
    id: number;
    name: string;
    city: string;
}

export interface Group {
    id: number;
    camp_id: number;
    name: string;
    description: string;
    camp_name: string;
}

export interface Achieve {
    image: string;
    level: string;
    name: string;
    effect: string;
}

export interface Lider {
    id: number;
    photo: string;
    first_name: string;
    last_name: string;
    gender: string;
    age: number;
    phone: string;

    speed: number;
    stamina: number;
    climbing: number;
    evasion: number;
    hiding: number;

    achieves: Achieve[];
}

export interface StudentProfile {
    photo: string;
    first_name: string;
    last_name: string;
    phone?: string;
    age: number;
    gender: string;
    active: boolean;
  }
  
  export interface StudentAddress {
    city?: string;
    street?: string;
    home?: string;
  }
  
  export interface StudentGroups {
    group_id: number;
    group_extra_id?: number;
  }
  
 interface StudentSummaries {
  test_avg: number;
  summary_tests: string;
  summary_achievements: string;
  summary_games: string;
  }

  export interface Student extends StudentProfile, StudentAddress, StudentGroups, StudentSummaries {
    id: number;
  }
  
  export interface Parent {
    id: number;
    name: string;
    phone: string;
    email: string;
  }
  
  export interface Attendance {
    Training: number;
    Exam: number;
    Game: number;
  }
  
  export type Test = {
    id: number;
    student_id: number;
    timestamp: number;

    speed: number;
    stamina: number;
    climbing: number;
    evasion: number;
    hiding: number;

    speed_time: number;
    stamina_time: number;
    climbing_time: number;
  };

  export enum Team {
    RED = "Red",
    GREEN = "Green"
  };

  export type Game = {
    game_id: number;
    timestamp: number;
    team: Team;

    caught: number;
    freeded: number;
    is_survived: boolean;
  };
  
  export interface Achievement {
    id: number;
    image: string;
    name: string;
    achieve_id: number;
    in_profile: boolean;
    category: string;
    level: string;
    trigger: string;
    effect: string;
  }
  

  export interface Achieve {
    id: number;
    image: string;
    name: string;
    category: string;
  }
  
  export interface AchieveAttach {
    student_id: number;
    achieve_id: number;
    level: string;
    in_profile: boolean;
  }

  export interface Metric {
    timestamp: number;
    name: string;
    score: number;
    time: string;
    unit: string;
  };

  export interface Comment {
    timestamp: number;
    comment: string;
}