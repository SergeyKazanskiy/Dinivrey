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
export const AchieveImages: string[] = ['alpinism', 'clock','award-2', 'award', 'dartboard', 'medal', 'rock', 'rocket',
  'route', 'climbing', 'muscle', 'tape', 'stopwatch', 'schedule', 'rope'
];
export const RuleTypes: string[] = ['Common', 'Personal'];
export const RuleLevels: string[] = ['Common', 'Rare', 'Epic', 'Mythic', 'Legendary'];

export const RuleTests: string[] = ['Speed', 'Stamina', 'Climbing', 'Evasion', 'Hiding'];
export const RuleConditions: string[] = ['<', '>', '='];
export const RulePersonal: string[] = ['first', 'last', 'max', 'min', 'agv'];

export const MeasureUnits: Record<string, string> = {
  Speed: "sec",
  Stamina: "min",
  Climbing: "sec",
  Evasion: "point",
  Hiding: "point",
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

export const examColors: string[] = ['#FFD13A', '#FF006F', '#FF5E1A', '#23FFB2', '#48F3FF']

export const ExamIcons: Record<string, any> = {
  Speed: require("../../assets/images/exercise/Speed.png"),
  Stamina: require("../../assets/images/exercise/Stamina.png"),
  Climbing: require("../../assets/images/exercise/Climbing.png"),
  Evasion: require("../../assets/images/exercise/Evasion.png"),
  Hiding: require("../../assets/images/exercise/Hiding.png"),
};

export const ExamGradientColors: Record<string, any> = {
  Speed: ['#3D3C0F', '#F0EE6E'],
  Stamina: ['#3E172C', '#ED3496'],
  Climbing: ['#715533', '#E79531'],
  Evasion: ['#16420F', '#8DCB83'],
  Hiding: ['#123d41ff', '#48F3FF'],
};

export const AchieveGradientColors: Record<string, any> = [
  ['#4E4E4E', '#D9D9D9'],
  ['#0A8703', '#79CB52'],
  ['#007152', '#00B3FF'],
  ['#5A4EA1', '#A84B9C'],
  ['#5A4EA1', '#A84B9C'],
];

export const Locations: string[] = ['Pardes Hanna Agricultural High School', 'Beit Eliezer High School']