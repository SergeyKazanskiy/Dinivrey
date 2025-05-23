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

export interface Schedule {
    id: number;
    group_id: number;
    weekday: number;
    hour: number;
    minute: number;
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

export interface Achieve {
    image: string;
    level: string;
    name: string;
}

export interface Lider {
    id: number;
    photo: string;
    first_name: string;
    last_name: string;
    gender: string;
    age: number;
    phone: string;

    speed: number;
    stamina: number;
    climbing: number;
    evasion: number;
    hiding: number;

    achieves: Achieve[];
}