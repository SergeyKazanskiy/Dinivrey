import {  StudentAddress } from '../model';
import { StateSlice } from '../state';


export interface AddressSlice {
    city: string;
    street: string;
    home: string;
    isAddressChanged: boolean;

    setCity:(city: string) => void;
    setStreet:(street: string) => void;
    setHome:(home: string) => void;

    checkAddress:() => void;
    getAddress:() => StudentAddress;
}

export const createAddressSlice = (set: any, get: any): AddressSlice => ({
    city: 'City',
    street: 'Street',
    home: 'Home',
    isAddressChanged: false,

    setCity:(city: string) => set({ city }),
    setStreet:(street: string) => set({ street }),
    setHome:(home: string) => set({ home }),

    checkAddress:() => {
        const { student, city, street, home }: StateSlice & AddressSlice= get();
        if (student) {
            const isAddressChanged = 
            city !== student.city ||
            street !== student.street ||
            home !== student.home;
            set({ isAddressChanged }); 
        }   
    },

    getAddress:() => {
        const { city, street, home }: AddressSlice = get();
        return { city, street, home }
    }
});