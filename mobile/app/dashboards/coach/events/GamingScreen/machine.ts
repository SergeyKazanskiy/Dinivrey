import { Student, Player } from '../model';
import { objectToJson } from '../../../../shared/utils';
import { RoundData } from '../model';
import { GamingSlice } from './state';


export interface GameMachine {
    isBackAlert: boolean;
    isSavingAlert: boolean;
    isEvadersDialog: boolean;
    isGameReport: boolean;

    blockTimeSettings: boolean;
    blockPlayersAdding: boolean;
    blockRoleChosing: boolean;
    blockPointsAdding: boolean; 

    timerSartTime: number;  
    isTimerRunning: boolean;
    isTimerReset: boolean;

    roundsAmount: number;         
    currentRound: number;   


    rounds: RoundData[];

    gameStep: 'Settings' | 'Game' | 'Report' 
    gameState: 'Waiting' | 'Playing' | 'Completion'

    // Events
    onNavbarBack: () => void;

    onTimerStart: () => void;
    onTimerStop: () => void;
    timerFinished: () => void;

    onEvadersTagged: () => void;
    onEvadersConfirm: () => void;


    // States
    step_on_game: () => void;
        switch_on_playing: () => void;
        switch_on_waiting: () => void;
        switch_on_completion: () => void;
    step_on_report: () => void;

    // Actions
    hideBackAlert: () => void; // Cancel
    hideGameReport: ( gameDate: string ) => void; // Close
}

export const createGameMachine = (set: any, get: any): GameMachine => ({
    isBackAlert: false,
    isSavingAlert: false
    isEvadersDialog: false,
    isGameReport: false,

    blockTimeSettings: false,
    blockPlayersAdding: false,
    blockRoleChosing: false,
    blockPointsAdding: true,

    timerSartTime: 600, 
    isTimerRunning: false,
    isTimerReset: false,

    roundsAmount: 2,       
    currentRound: 1,

    rounds: [
        {
        team: 'Red',
        role: 'Evader',
        round: 1,
        players: [
            { name: 'Player 1', status: 'Survived', points: 13 },
            { name: 'Player 1', status: 'Caught', points: 7 },
            { name: 'Player 1', status: 'Caught', points: 4 },
            { name: 'Player 1', status: 'Survived', points: 3 },
            { name: 'Player 1', status: 'Survived', points: 2 },
            { name: 'Player 1', status: 'Caught', points: 0 },
        ],
        },
        {
        team: 'Green',
        role: 'Chaser',
        round: 1,
        players: [
            { name: 'Player 2', status: 'Survived', points: 12 },
            { name: 'Player 2', status: 'Survived', points: 10 },
            { name: 'Player 2', status: 'Survived', points: 8 },
            { name: 'Player 2', status: 'Survived', points: 6 },
            { name: 'Player 2', status: 'Survived', points: 4 },
            { name: 'Player 2', status: 'Survived', points: 0 },
        ],
        },
    ],

    gameStep: 'Settings',
    gameState: 'Waiting',

    // Events
    onTimerStart: () => {
        const { gameStep }: GameMachine = get();

        if (gameStep === 'Settings')  {
            get().switch_on_game();
        }
         get().switch_on_playing();
    },

    onTimerStop: () => {
        get().switch_on_completion();
    },

    timerFinished: () => {
        get().switch_on_completion();
    },

    onNavbarBack: () => {
        const { gameStep }: GameMachine = get();

        if (gameStep === 'Game') set({ isBackAlert: true });
    },

    onEvadersTagged: () => {
        const { roundsAmount, currentRound }: GameMachine = get();

        if (currentRound < roundsAmount) {
            get().switch_on_waiting();
        } else {
            get().switch_on_report();
        }
    },

    onEvadersConfirm: () => {
        const { toggleTeam, clearPoints }: GamingSlice = get();
        toggleTeam();
        clearPoints();

        const { roundsAmount, currentRound }: GameMachine = get();
        if (currentRound < roundsAmount) {
            get().switch_on_waiting();
        } else {
            get().switch_on_report();
        }
    },

    // States
    step_on_game: () => set({
        gameFlow: 'Game',
        blockTimeSettings: true,
        blockPlayersAdding: true,
        blockRoleChosing: true,
    }),

    switch_on_playing: () => set({
        gameState: 'Playing',
        isTimerRunning: true,
        blockPointsAdding: false 
    }),

    switch_on_waiting: () => set({
        gameState: 'Waiting',
        isTimerRunning: false,

        blockTimeSettings: false,
    }),

    switch_on_completion: () => set({
        gameState: 'Completion',
        isComplection: true
    }),

    step_on_report: () => set({
        gameFlow: 'Report',
        isEvadersDialog: false,
        isGameReport: true,
    }),

    // Actions
    hideBackAlert: () => set({ isBackAlert: false }),
    hideGameReport: () => {
        set({ isSavingResult: false }
        save_result()    
        set({ isGameReport: false }
    )},
});

