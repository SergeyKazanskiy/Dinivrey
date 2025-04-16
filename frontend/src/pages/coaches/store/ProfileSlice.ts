import { CoacheInfo } from '../model';
//import { Store } from '../screen';


export interface ProfileSlice {
    coacheInfo: CoacheInfo;
    setCoacheInfo: (info: Partial<CoacheInfo>) => void;
    saveCoacheInfo: () => void; 
}

export const createProfileSlice = (set: any): ProfileSlice => ({

    coacheInfo: {
        firstName: "Name",
        lastName: "Name",
        phone: "123456789",
        email: "TestEmail@gmail.com",
        active: true,
      },

      setCoacheInfo: (info) =>
        set((state: any) => ({
        userInfo: { ...state.studentInfo, ...info },
    })),

    saveCoacheInfo: () =>
        set((state: any) => ({
            
        })),
});