export const months = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December',];

export const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const effectNames = ["fade", "rotate", "pulse", "jump", "ripple"];
export type EffectName = (typeof effectNames)[number];

interface Effect {
  name: EffectName;
  apply: (value: boolean) => React.CSSProperties;
}

export const effects: Effect[] = [
  { name: "fade", apply: (value) => ({ opacity: value ? 0.2 : 1, transition: "transform 0.6s ease-in-out" }) },
  { name: "rotate", apply: (value) => ({ transform: `rotate(${value ? 90 : 0}deg)`, transition: "transform 0.6s ease-in-out" }) },
  { name: "jump", apply: (value) => ({ transform: `translateY(${value ? -20 : 0}px)`, transition: "transform 0.6s ease" }) },
  { name: "pulse", apply: (value) => ({ transform: `scale(${value ? 1.3 : 1})`, transition: "transform 0.6s ease-in-out" }) },
  { name: "ripple", apply: (value) => ({ boxShadow: value ? "0 0 20px 5px rgba(0, 0, 0, 0.2)" : "none", transition: "box-shadow 0.6s ease-in-out" }) }
];  

export const eventTypes = ["Game", "Exam", "Training"];

export const AchieveCategories: string[] = ['Test', 'Game', 'Participate', 'Additional'];
export const AchieveTypes: string[] = ['Manual', 'Automatic'];
export const AchieveImages: string[] = ['alpinism', 'clock','award-2', 'award', 'dartboard', 'medal', 'rock', 'rocket'];

export const RuleTypes: string[] = ['Common', 'Personal'];
export const RuleLevels: string[] = ['Common', 'Rare', 'Super', 'Epic'];

export const RuleTests: string[] = ['Speed', 'Stamina', 'Climbing', 'Evasion', 'Hiding'];
export const RuleConditions: string[] = ['<', '>', '='];
export const RulePersonal: string[] = ['first', 'last', 'max', 'min', 'agv'];

export const MeasureUnits: Record<string, string> = {
  Speed: "m/s",
  Stamina: "min",
  Climbing: "grade",
  Evasion: "ball",
  Hiding: "sec",
};

export const Genders = ['Boy', 'Girl'];
export const StudentsIcons = {
  Boy: "Student_boy.png",
  Girl: "Student_girl.png",
};

export const ImagesPath = 'http://localhost:8000/images'

export const TabIcons = {
  Attendance: 'checkmark-done-sharp',
  Testing: 'document-text-outline',
  Gaming: 'trophy-outline',
  Drills:'cube-outline'
}