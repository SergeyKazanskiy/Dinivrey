import { Student, Player } from '../model';
import { objectToJson } from '../../../../shared/utils';


export interface GamingSlice {
    isGreen: boolean;
    currentTeam: boolean; //isGreen?

    availableStudents: Student[];
    selectedStudentIds: number[];

    players: Player[];
    playersToRemove: number[];

    player_id: number;

    isHeader: boolean;

    isAddingPopup: boolean;
    isRemovingPopup: boolean;
    isRemoveAlert: boolean;


    setAvailableStudents: (availableStudents: Student[]) => void;
    setCurrentTeam: (currentTeam: boolean) => void;

    toggleTeam: () => void;
    toggleHeader: () => void;

    //Points
    addPoint: (id: number) => void;
    removePoint: (id: number) => void;

    //Popups
    showAddingPopup: () => void;
    hideAddingPopup: () => void;

    showRemovingPopup: () => void;
    hideRemovingPopup: () => void;

    showRemoveAlert: () => void;
    hideRemoveAlert: () => void;

    //Players
    selectStudent: (id: number) => void;
    addPlayers: () => void;

    selectPlayer: (player_id: number) => void;
    removePlayers: () => void;

    confirmRemovePlayer: (id: number) => void;
    cancelRemovePlayer: (id: number) => void;
    
    clearPoints: () => void;
}

export const createGamingSlice = (set: any, get: any): GamingSlice => ({
    isGreen: true,
    currentTeam: true,

    players: [
        { id: 1, name: 'Player 1', age: 8, points: 0, isGreen: true },
    ],
    player_id: 0,

    isHeader: true,

    isAddingPopup: false,
    isRemovingPopup: false,
    isRemoveAlert: false,

    availableStudents: [],
    selectedStudentIds: [],
    playersToRemove: [],


    setAvailableStudents: (availableStudents: Student[]) => set({ availableStudents }),
    setCurrentTeam: (currentTeam: boolean) => set({ currentTeam }),

    toggleTeam:() => set((state: GamingSlice) => ({ isGreen: !state.isGreen })),
    toggleHeader: () => set((state: GamingSlice) => ({ isHeader: !state.isHeader })),

    addPoint: (id) => set((state: GamingSlice) => ({
        players: state.players.map((p) =>
            p.id === id ? { ...p, points: p.points + 1 } : p
        ),
    })),

    removePoint: (id) => set((state: GamingSlice) => ({
        players: state.players.map((p) =>
            p.id === id && p.points > 0 ? { ...p, points: p.points - 1 } : p
        ),
    })),


    showAddingPopup: () => set({ isAddingPopup: true }),
    hideAddingPopup: () => set({ isAddingPopup: false, selectedStudentIds: [] }),

    showRemovingPopup: () => set({ isRemovingPopup: true }),
    hideRemovingPopup: () => set({ isRemovingPopup: false,  playersToRemove: [] }),

    showRemoveAlert: () => set({ isRemoveAlert: true }),
    hideRemoveAlert: () => set({ isRemoveAlert: false }),


    selectStudent: (id) => set((state: GamingSlice) => ({

      selectedStudentIds: state.selectedStudentIds.includes(id)
        ? state.selectedStudentIds.filter(el => el !== id)
        : [...state.selectedStudentIds, id],
    })),

    addPlayers: () => {
        const { availableStudents, selectedStudentIds, players, currentTeam }: GamingSlice = get();

        const newPlayers: Player[] = availableStudents.filter(el => selectedStudentIds.includes(el.id))
        .map((el) => ({
            id: el.id, 
            name: `${el.last_name} ${el.first_name[0]}`,
            points: 0,
            age: el.age,
            isGreen: currentTeam
        }));
        set({ players: [...players, ...newPlayers], selectedStudentIds: [], });
    },

    selectPlayer: (player_id: number) => set({player_id}),
    removePlayers: () => set((state: GamingSlice) => ({
       // players: [],
        players: state.players.filter((p) => !state.playersToRemove.includes(p.id)),
        playersToRemove: [],
    })),


    confirmRemovePlayer: (id) => {
        const { playersToRemove }: GamingSlice = get();

        if (playersToRemove.includes(id)) {
            set({ playersToRemove: playersToRemove.filter((el) => el !== id) });
        } else {
            set({ playersToRemove: [...playersToRemove, id] });
        }
    },

    cancelRemovePlayer: (id) => set((state: GamingSlice) => ({
        playersToRemove: state.playersToRemove.filter((pid) => pid !== id),
    })),

    clearPoints: () => set((state: GamingSlice) => ({
        players: state.players.map(el => ({...el, points: 0}))
    }))
});

