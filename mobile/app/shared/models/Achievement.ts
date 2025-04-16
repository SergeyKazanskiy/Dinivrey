export enum Trigger {
    Manual,
    Automatic
}
  
export enum Category {
    Game,
    Test
}
  
export enum Level {
    Easy,
    Medium,
    Hard
}

export interface Achievement {
    id: number;
    image: HTMLImageElement;
    name: string;
    category: Category;
    trigger: Trigger;
    desc: string;
    rare: boolean;
  }
  
  export interface AchievementRule {
    id: number;
    achievement_type_id: number;
    level: Level;
    rule: string;
  }
  
  export interface Achievements {
    id: number;
    student_id: number;
    game_id: number;
    achievement_id: number;
    
    level: Level;
    mark: number;
  }