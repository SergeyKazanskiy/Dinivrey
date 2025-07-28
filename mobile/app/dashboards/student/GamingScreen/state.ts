import { Student, Player, GameRound, Team, Role } from '../model';
import { objectToJson } from '../../../shared/utils';
import { get_students } from '../http';
import { ProfileSlice } from '../ProfileScreen/state';


export interface GamingSlice {
    isGamingScreen: boolean;
    setGamingScreen: (isGamingScreen: boolean) => void;

    students: Student[];
    players: Player[];

    // Temp
    currentTeam: Team; 
    currentRole: Role;

    selectedStudentIds: number[];
    playersToRemove: number[];

    isPointsFixing: boolean;

    // Process
    currentRound: GameRound;
    player_id: number;
    pointsDifference: number;

    // Visibility
    isHeader: boolean;
    isAddingPopup: boolean;
    isRemovingPopup: boolean;
    isRemoveAlert: boolean;
    isTimeSetter: boolean;
    isAddNewDialog: boolean;

    // Setup
    setCurrentTeam: (currentTeam: Team) => void;
    setCurrentRole: (currentRole: Role) => void;
    
    loadStudents: () => void;
    swapRoles: () => void;
    setNextRound: () => void;
    
    // Points
    addPoint: (id: number) => void;
    removePoint: (id: number) => void;

    // Visibility
    toggleHeader: () => void;

    showAddingPopup: () => void;
    hideAddingPopup: () => void;

    showRemovingPopup: () => void;
    hideRemovingPopup: () => void;

    showRemoveAlert: () => void;
    hideRemoveAlert: () => void;

    showTimeSetter: () => void;
    hideTimeSetter: () => void;

    showAddNewDialog: () => void;
    hideAddNewDialog: () => void;

    //Players
    selectStudent: (id: number) => void;
    addPlayers: () => void;
    addNewPlayer: (name: string) => void;

    selectPlayer: (player_id: number) => void;
    removePlayers: () => void;

    confirmRemovePlayer: (id: number) => void;
    cancelRemovePlayer: (id: number) => void;
    
    clearPoints: () => void;
    clearPlayers: () => void;
}

export const createGamingSlice = (set: any, get: any): GamingSlice => ({
    isGamingScreen: false,
    setGamingScreen: (isGamingScreen: boolean) => {
        set({isGamingScreen});
       // alert(isGamingScreen)
    },

    // Data
    students: [],
    players: [],

    // Temp
    selectedStudentIds: [],
    playersToRemove: [],

    currentTeam: Team.GREEN, 
    currentRole: Role.CHASER,

    isPointsFixing: false,

    // Process
    player_id: 0,
    currentRound: {
        round: 1,
        teams: [
            {team: Team.RED, role: Role.EVADER},
            {team: Team.GREEN, role: Role.CHASER},
        ]
    },
    pointsDifference: 0,

    // Visibility
    isHeader: true,
    isAddingPopup: false,
    isRemovingPopup: false,
    isRemoveAlert: false,
    isTimeSetter: false,
    isAddNewDialog: false,

    // Setup
    loadStudents: () => {
        const { student }: ProfileSlice = get();
       
        get_students(student.group_id, (students: Student[]) => {
           // alert(objectToJson(students))
            set({ students });
        })
    },

    swapRoles: () => {
        set((state: GamingSlice) => ({
            players: state.players.map(el => ({...el, role: el.role === Role.CHASER ? Role.EVADER : Role.CHASER}))
        }));

        set((state: GamingSlice) => {
            const swappedTeams = state.currentRound.teams.map((t) => ({
                ...t,
                role: t.role === Role.CHASER ? Role.EVADER : Role.CHASER,
            }));
            return { currentRound: { ...state.currentRound, teams: swappedTeams}};
        })
    },

    setNextRound: ()  => {
        set((state: GamingSlice) => ({ currentRound: { ...state.currentRound, round: 2 } }));
    },

    setCurrentTeam: (currentTeam: Team) => set({ currentTeam }),
    setCurrentRole: (currentRole: Role) => set({ currentRole }),

    // Points
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

    // Visibility
    toggleHeader: () => set((state: GamingSlice) => ({ isHeader: !state.isHeader })),

    showAddingPopup: () => set({ isAddingPopup: true }),
    hideAddingPopup: () => set({ isAddingPopup: false, selectedStudentIds: [] }),

    showRemovingPopup: () => set({ isRemovingPopup: true }),
    hideRemovingPopup: () => set({ isRemovingPopup: false,  playersToRemove: [] }),

    showRemoveAlert: () => set({ isRemoveAlert: true }),
    hideRemoveAlert: () => set({ isRemoveAlert: false }),

    showTimeSetter: () => set({ isTimeSetter: true }),
    hideTimeSetter: () => set({ isTimeSetter: false }),

    showAddNewDialog: () => set({ isAddNewDialog: true }),
    hideAddNewDialog: () => set({ isAddNewDialog: false }),

    // Players
    selectStudent: (id) => set((state: GamingSlice) => ({

      selectedStudentIds: state.selectedStudentIds.includes(id)
        ? state.selectedStudentIds.filter(el => el !== id)
        : [...state.selectedStudentIds, id],
    })),

    addPlayers: () => {
        const { students, selectedStudentIds, players, currentTeam, currentRole }: GamingSlice = get();

        const newPlayers: Player[] = students.filter(el => selectedStudentIds.includes(el.id))
        .map((el) => ({
            id: el.id, 
            name: `${el.last_name} ${el.first_name[0]}`,
            points: 0,
            age: el.age,
            team: currentTeam,
            role: currentRole
        }));
        set({ players: [...players, ...newPlayers], selectedStudentIds: [], });
    },

    addNewPlayer: (name: string) => {
        const { players, currentTeam, currentRole }: GamingSlice = get();

        const newPlayer: Player = {
            id: getRandomFraction(), 
            name: name,
            points: 0,
            age: 8,
            team: currentTeam,
            role: currentRole
        };
        set({ players: [...players, newPlayer], });
    },

    selectPlayer: (player_id: number) => set({player_id}),
    removePlayers: () => set((state: GamingSlice) => ({
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
    })),

    clearPlayers: () => set({players: []}),
});


function getRandomFraction(): number {
    const randomInt = Math.floor(Math.random() * 1000) + 1;
    return randomInt / 1000;
}