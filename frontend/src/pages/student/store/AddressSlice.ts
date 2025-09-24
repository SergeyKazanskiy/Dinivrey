import {  StudentAddress } from '../model';
import { StateSlice } from '../state';


export interface AddressSlice {
    city: string;
    street: string;
    house: string;
    isAddressChanged: boolean;

    setCity:(city: string) => void;
    setStreet:(street: string) => void;
    setHome:(house: string) => void;

    checkAddress:() => void;
    getAddress:() => StudentAddress;
}

export const createAddressSlice = (set: any, get: any): AddressSlice => ({
    city: 'City',
    street: 'Street',
    house: '',
    isAddressChanged: false,

    setCity:(city: string) => set({ city }),
    setStreet:(street: string) => set({ street }),
    setHome:(house: string) => set({ house }),

    checkAddress:() => {
        const { student, city, street, 	house }: StateSlice & AddressSlice= get();
        if (student) {
            const isAddressChanged = 
            city !== student.city ||
            street !== student.street ||
            house !== student.house;
            set({ isAddressChanged }); 
        }   
    },

    getAddress:() => {
        const { city, street, house }: AddressSlice = get();
        return { city, street, house }
    }
});