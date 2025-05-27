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
    trainings: number;
    tests: number;
    games: number;
  }
  
  export type Test = {
    id: number;
    timestamp: number;
    speed: number;
    stamina: number;
    climbing: number;
    evasion: number;
    hiding: number;
  };
  
  export type Game = {
    id: number;
    timestamp: number;
    caughted: number;
    freeded: number;
    //description?: string;
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
    unit: string;
  };