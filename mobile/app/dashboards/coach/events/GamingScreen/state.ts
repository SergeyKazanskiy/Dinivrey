import { Student, Player, GameRound, Team, Role } from '../model';
import { objectToJson } from '../../../../shared/utils';


export interface GamingSlice {
    
    // Data
    availableStudents: Student[];
    players: Player[];

    // Temp
    currentTeam: Team; 
    currentRole: Role;

    selectedStudentIds: number[];
    playersToRemove: number[];

    // Process
    currentRound: GameRound;
    player_id: number;

    // Visibility
    isHeader: boolean;
    isAddingPopup: boolean;
    isRemovingPopup: boolean;
    isRemoveAlert: boolean;
    isTimeSetter: boolean;

    // Setup
    setCurrentTeam: (currentTeam: Team) => void;
    setCurrentRole: (currentRole: Role) => void;
    
    setAvailableStudents: (availableStudents: Student[]) => void;
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
    // Data
    availableStudents: [],
    players: [
        { id: 1, name: 'Player 1', age: 8, points: 0, team: Team.GREEN },
    ],
    

    // Temp
    selectedStudentIds: [],
    playersToRemove: [],

    currentTeam: Team.GREEN, 
    currentRole: Role.CHASER,

    // Process
    player_id: 0,
    currentRound: {
        round: 1,
        teams: [
            {team: Team.GREEN, role: Role.CHASER},
            {team: Team.RED, role: Role.EVADER},
        ]
    },

    // Visibility
    isHeader: true,
    isAddingPopup: false,
    isRemovingPopup: false,
    isRemoveAlert: false,
    isTimeSetter: false,

    // Setup
    setAvailableStudents: (availableStudents: Student[]) => set({ availableStudents }),

    swapRoles: () => {
        set((state: GamingSlice) => {
            const swappedTeams = state.currentRound.teams.map((t) => ({
                ...t,
                role: t.role === Role.CHASER ? Role.EVADER : Role.CHASER,
            }));
            return { currentRound: { ...state.currentRound, teams: swappedTeams}};
        })
        const { currentRound }: GamingSlice = get();
        //alert(objectToJson(currentRound))
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

    // Players
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
            team: currentTeam
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

