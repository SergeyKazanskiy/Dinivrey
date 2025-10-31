import { Store } from "../store";
import { Student, Achievement, Test, Game, Event } from "../model";
import { get_student, get_student_first_achieve, get_last_test, save_notification_token } from '../http';
import { get_last_game, get_upcoming_events, update_student_avatar, get_student_group} from '../http';
import { get_student_attendance_count, get_notifications, delete_notifications } from '../http';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';


const TOKEN_KEY = "fcm_token";
const TOKEN_TS_KEY = "fcm_token_timestamp";
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;


export interface ProfileSlice {
  student_id: number;
  student: Student;

  last_test: Partial<Test>;
  average: number;

  last_game: Partial<Game>;
  upcoming_events: Event[];
  
  isBackDrawer: boolean;
  isAvatarsModal: boolean;

  notificationsAlert: string;
  isNotificationsModal: boolean;
  notifications: string[];
 
  camp_name: string;
  group_name: string;

  level: number;
  percent: number;
  levelColor: string;
  profile_achievement: Achievement | undefined;


  saveNotificationToken: (student_id: number) => void;
  loadStudent: (studentId: number) => void;
  clickAchievement: (achievement_id: number) => void;

  setBackDrawer: (isBackDrawer: boolean) => void;

  loadNotifications: (studentId: number) => void;
  deleteNotifications: () => void;

  showNotificationsModal: () => void;
  hideNotificationsModal: () => void;
  hideNotificationsAlert: () => void;

  clickAvatar: (avatar: string) => void;
  showAvatarsModal: () => void;
  hideAvatarsModal: () => void;
}

export const createProfileSlice = (set: any, get: () => Store): ProfileSlice => ({
  student_id: 0,
  student: { first_name: "FirstName", last_name: "LastName", gender: "Girl", age: 10, id: 0, active: true,
    photo: '', group_id: 3, group_extra_id: 0, avatar: 'Avatar_1' },

  last_test: { id: 0, timestamp: 0, speed: 0, stamina: 0, climbing: 0, evasion: 0, hiding: 0 },
  average: 0,
  
  last_game: { game_id: 0, timestamp: 0, caught: 0, freeded: 0, is_survived: true },
  upcoming_events: [],

  isBackDrawer: true,
  isAvatarsModal: false,

  notificationsAlert: '',
  isNotificationsModal: false,
  notifications: [], //'⭐ Great progress! Your achievement Speed has been upgraded to Mythic'

  camp_name: '',
  group_name: '',
  
  level: 1,
  percent: 0,
  levelColor: '#43BB32',
  profile_achievement: undefined,

  
  saveNotificationToken: async (student_id: number) => {
    if (Device.isDevice && Platform.OS !== "web") {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
  
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
  
      if (finalStatus !== 'granted') {
        set({ notificationsAlert: 'Push notifications permission denied!' });
        return;
      }
  
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      
      save_notification_token(student_id, {token_FCM: token}, (res => {
        if (res.isOk) {
          set({ notificationsAlert: 'Push notifications on!' });
        }
      }));
    } else {
      // alert('Push notifications only work on a real device');
      
      // save_notification_token(student_id, {token_FCM: 'Test_token_FCM'}, (res => {
      //   if (res.isOk) {
      //     set({ notificationsAlert: 'Test push notifications on!' });
      //   }
      // }));
    }
  },

  loadStudent:(student_id: number) => {
    get_student(student_id, (student: Student) => {
      if (student) {
        const { saveNotificationToken, loadNotifications }: ProfileSlice = get();
        saveNotificationToken(student_id);
        loadNotifications(student_id);

        set({ student, student_id });

        get_student_group(student.group_id, (group => {
           set({ group_name: group.name });
        }));

        get_student_first_achieve(student_id, (achievements: Achievement[]) => {
          if (achievements.length > 0) {
            set({ profile_achievement: achievements[0] });
          }
        }); 

        get_last_test(student_id, (tests: Test[]) => {
          if (tests.length > 0) {
            const test = tests[0];
            const average=(test.speed + test.stamina + test.climbing + test.evasion + test.hiding) / 5
            
            set({ last_test: test, average});
          } else {
            const emptyTest:  Partial<Test> = { id: 0, timestamp: 0, speed: 0, stamina: 0, climbing: 0, evasion: 0, hiding: 0 };
            set({ last_test: emptyTest});
          }
        });

        get_last_game(student_id, (games: Game[]) => {
          if (games.length > 0) {
            set({ last_game: games[0]});
          } else {
            const emptyGame:  Partial<Game> = { game_id: 0, timestamp: 0, caught: 0, freeded: 0, is_survived: true };
            set({ last_game: emptyGame});
          }
        });

        const extra = student.group_extra_id ? student.group_extra_id : 0
        get_upcoming_events(student.group_id, extra, (events: Event[]) => {
          set({ upcoming_events: events });
        });

        get_student_attendance_count(student_id, (res: {count: number}) => {
          const { levelColor, level, percent } = getAttendanceLevel(res.count);

          set({ levelColor, level, percent });
        })
      }
    });
  },

  clickAchievement: (achievement_id: number) => {
    set({ achievement_id })
  },

   setBackDrawer: (isBackDrawer: boolean) => set({isBackDrawer}),

  loadNotifications: (studentId: number) => {
    get_notifications(studentId, (notifications: string[]) => {
      //alert(objectToJson(notifications))

      set({notifications});
    })
  },

  deleteNotifications: () => {
    const { student_id }: ProfileSlice = get();

    delete_notifications(student_id, (res => {
        if (res.isOk) {
            set({notifications: [], notifications_count: 0});
        }
    }));
  },

  showNotificationsModal:() => set({isNotificationsModal: true}),
  hideNotificationsModal:() => set({isNotificationsModal: false}),
  hideNotificationsAlert:() => set({notificationsAlert: ''}),

  clickAvatar: (avatar: string) => {
    const { student_id, student }: ProfileSlice = get();
    update_student_avatar(student_id, {avatar}, (res => {
      if (res.isOk) {
        student.avatar = avatar;
        set({ isAvatarsModal: false });
      }
    }))
  },
  showAvatarsModal: () => set({ isAvatarsModal: true }),
  hideAvatarsModal: () => set({ isAvatarsModal: false }),
});

// Private functions
export function getAttendanceLevel(amount: number): {levelColor: string, level: number, percent: number} {
  let count = 0, level = 0, factor = getLevelData(1).factor, step = 0;

  while (count < amount) {
    step++;

    if (step === factor) {
      level++;
      factor = getLevelData(level + 1).factor;
      step = 0;
    }
    count++;
    //alert('level:' + level + ' step:' + step + ' factor:' + factor + ' count:' + count)
  }
  const percent = step / factor === 1 ? 0 : parseFloat((step / factor).toFixed(2));
  return {levelColor: getLevelData(level).color, level, percent }
}

function getLevelData(level: number): {color: string, factor: number} {

  if (level > 25) return {color: '#FBFC02', factor: 4};
  if (level > 20) return {color: '#BE312F', factor: 4};
  if (level > 15) return {color: '#B139E4', factor: 3};
  if (level > 10) return {color: '#2D5EC2', factor: 2};
  if (level > 5) return {color: '#43BB32', factor: 1};
  else return {color: '#D9D9D9', factor: 1};
}

// saveNotificationToken: async (student_id: number) => {
//     const now = Date.now();

//     if (Platform.OS === "web") { // only for test
//       const testToken = "web-test-token";
//       save_notification_token(student_id, { token_FCM: testToken }, (res => {
//         if (res.isOk) {
//             AsyncStorage.setItem(TOKEN_KEY, testToken);
//             AsyncStorage.setItem(TOKEN_TS_KEY, now.toString());
//           }
//       }));
//       return;
//     }

//     const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
//     const storedTs = await AsyncStorage.getItem(TOKEN_TS_KEY);
//     const isExpired = !storedTs || now - parseInt(storedTs, 10) > WEEK_MS;

//     if (!storedToken || isExpired) {
//       try {
//         const newToken = await messaging().getToken(); // onTokenRefresh where?
//         save_notification_token(student_id, {token_FCM: newToken}, (res => {
//           if (res.isOk) {
//             AsyncStorage.setItem(TOKEN_KEY, newToken);
//             AsyncStorage.setItem(TOKEN_TS_KEY, now.toString());
//           }
//         }));
//       } catch (err) {
//         Alert.alert('FCM onTokenRefresh error:', JSON.stringify(err));
//       }
//     }
//   },