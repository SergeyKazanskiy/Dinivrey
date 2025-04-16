import { AspectRatio } from '@chakra-ui/react';
import { StudentProfile } from '../model';
import { StateSlice } from '../state';


export interface ProfileSlice {
    photo: string;
    first_name: string;
    last_name: string;
    phone: string;
    age: number;
    gender: string;
    active: boolean;

    isProfileChanged: false,

    setPhoto:(photo: string) => void;
    setFirstName:(firstName: string) => void;
    setLastName:(lastName: string) => void;
    setPhone:(phone: string) => void;
    setAge:(age: number) => void; 
    setGender:(gender: string) => void;
    setIsActive:(isActive: boolean) => void;

    checkProfile:() => void;
    getProfile:() => StudentProfile ;
}

export const createProfileSlice = (set: any, get: any): ProfileSlice => ({
    photo: '',
    first_name: "Name",
    last_name: "Name",
    phone: "123456789",
    age: 8,
    gender: "Girl",
    active: true,
    
    isProfileChanged: false,

    setPhoto:(photo: string) => set({ photo }),
    setFirstName:(first_name: string) => set({ first_name }),
    setLastName:(last_name: string) => set({ last_name }),
    setPhone:(phone: string) => set({ phone }),
    setAge:(age: number) => set({ age }),
    setGender:(gender: string) => set({ gender }),
    setIsActive:(active: boolean) =>  set({ active }),

    checkProfile:() => { 
        const { student, first_name, last_name, phone, age, gender, active }: StateSlice &  ProfileSlice = get();
        if (student) {
            const isProfileChanged = 
            student.first_name !== first_name ||
            student.last_name !== last_name ||
            student.phone !== phone ||
            student.gender !== gender ||
            student.age !== age ||
            student.active !== active;
            set({ isProfileChanged });
        }    
    },

    getProfile:() => {
        const { photo, first_name, last_name, phone, age, gender, active }: ProfileSlice = get();
        return { photo, first_name, last_name, phone, age, gender, active }
    }
})

