import { AxiosError } from "axios";
import { Store } from "../store";
import { api } from "../../../shared/httpClient";
import { Student, Event, Achievement } from "./model";
import { EventType } from "../../../shared/models/Event";
import { student, profile_achievements, achievements, events } from "../test";


export interface ProfileState {
  id: number; //Temp
  student: Student;
  profile_achievements: Achievement[];
  achievements: Achievement[];
  events: Event[];
  isOpenAchievements: boolean;

  get_student: (id: number) => void;
  get_achievements: (id: number) => void;
  open_achievements: () => void;
  close_achievements: () => void; //Cancel
  add_achievement: (id: number, inx: number) => void;
  get_events: (student_id: number) => void;
}

export const createProfileState = (set: any, get: () => Store): ProfileState => ({
  id: 1,
  student: {
    first_name: "FirstName",
    last_name: "LastName",
    gender: "Girl",
    age: 10,
    active: true,
    city: "City",
    street: "Street",
    house: "18",
  },
  profile_achievements: [
    {
      imageName: 'Tagger.png'
    },
    {
      imageName: 'Lider.png'
    },
    {
      imageName: 'Score.png'
    },
  ],
  achievements: [
    {
      imageName: 'Lider.png'
    },
    {
      imageName: 'Skill.png'
    },
    {
      imageName: 'Careful.png'
    }
  ],
  events: [
    {
      type: EventType.Test,
      title: "Speed testing",
      desc: "We going to running 100m",
      date: "Fri 5, 16:00",
      time: "16:00",
    },
    {
      type: EventType.Game,
      title: "Super game",
      desc: "We going to win group 1",
      date: "Fri 5, 17:00",
      time: "16:00",
    },
  ],
  isOpenAchievements: false,

  // Student
  get_student: () => set((prevState: any) => {
    get().set_loading(true);

    api.get(`/students/${prevState.id}`)
      .then((res) => {
        const items: Student[] = res.data;
        set({ students: items });
      })
      .catch((error: AxiosError) => { get().set_error(true, error.message) })
      .finally(() => { get().set_loading(false) });
  }),

  // Achievements
  get_achievements: (prevState: any) => set(() => { //profile
    get().set_loading(true);

    api.get(`/students/${prevState.id}/profile/achievements`)
      .then((res) => {
        const items: Achievement[] = res.data;
        set({ profile_achievements: items });
      })
      .catch((error: AxiosError) => { get().set_error(true, error.message) })
      .finally(() => { get().set_loading(false)});
  }),

  open_achievements: () => {
    set({ isOpenAchievements: true });
    /*
    

    get().set_loading(true);

    api.get(`/students/${prevState.id}/achievements/for_profile`)
    .then((res) => {
      const items: Achievement[] = res.data;
      set({ achievements: items });
    })
    .catch((error: AxiosError) => { get().set_error(true, error.message) })
    .finally(() => { get().set_loading(false)});
    */
  },

  close_achievements: () => set((prevState: any) => {
    set({ isOpenAchievements: false }, {last_achievements: []});
  }),

  add_achievement: (inx: number) => set((prevState: any) => {
    get().set_loading(true);

    api.post(`/students/${prevState.id}/profile/achievements/${inx}`)
      .then((res) => {
        const items: Achievement[] = res.data;
        set({ profile_achievements: items });
      })
      .catch((error: AxiosError) => { get().set_error(true, error.message) })
      .finally(() => { get().set_loading(false), {isOpenAchievements: false}, {last_achievements: []}});
  }),

  // Events
  get_events: () => set((prevState: any) => {
    get().set_loading(true);

    api.get(`/students/${prevState.id}/events`)
      .then((res) => {
        const items: Event[] = res.data;
        set({ events: items });
      })
      .catch((error: AxiosError) => { get().set_error(true, error.message) })
      .finally(() => { get().set_loading(false) });
  }),
});
