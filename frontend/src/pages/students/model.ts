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
}

export interface Student {
    id: number;
    group_id: number;
    photo: string;
    first_name: string;
    last_name: string;
    gender: string;
    age: number;
    phone?: string;
    active: boolean;
}
