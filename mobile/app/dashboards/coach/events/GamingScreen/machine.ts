import { Student, Player, GameRound, Team, Role } from '../model';
import { objectToJson } from '../../../../shared/utils';
import { GamingSlice } from './state';
import { ReportSlice } from './data';
import { ROUNDS_AMOUNT, INITIAL_ROUND_TIME } from './constants';


export interface GameMachine {
    // Modals
    isNewGame: boolean;
    isBackAlert: boolean;
    isEvadersDialog: boolean;
    isGameReport: boolean;
    isSuccessAlert: boolean;

    // Bloking
    blockTimeSettings: boolean;
    blockPlayersAdding: boolean;
    blockRoleChosing: boolean;
    blockPointsAdding: boolean; 
 
    // Process
    isTimerRunning: boolean;
    isTimerReset: boolean;

    // States
    gameStep: 'Settings' | 'Game' | 'Report' 
    gameState: 'Waiting' | 'Playing' | 'Completion'


    // Events
    onNavbarBack: () => void;
    onErrorExit: () => void;

    onTimerStart: () => void;
    onTimerStop: () => void;
    onTimerFinish: () => void;

    onEvadersConfirm: () => void;

    // States
    step_on_settings: () => void;
    step_on_game: () => void;
        switch_on_playing: () => void;
        switch_on_waiting: () => void;
        switch_on_completion: () => void;
    step_on_report: () => void;

    // Actions
    hideBackAlert: () => void; // Cancel ??? if agree?
    hideGameReport: () => void;
    hideSuccessAlert: () => void;
}

export const createGameMachine = (set: any, get: any): GameMachine => ({
    isNewGame: true,
    isBackAlert: false,
    isEvadersDialog: false,
    isGameReport: false,
    isSuccessAlert: false,

    blockTimeSettings: false,
    blockPlayersAdding: false,
    blockRoleChosing: false,
    blockPointsAdding: true,

    isTimerRunning: false,
    isTimerReset: false,

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

    onTimerFinish: () => {
        get().switch_on_completion();
    },

    onNavbarBack: () => {
        const { gameStep }: GameMachine = get();

        if (gameStep === 'Game') set({ isBackAlert: true });
    },

    onEvadersConfirm: () => {
        const {  currentRound, swapRoles, clearPoints }: ReportSlice & GamingSlice & GameMachine = get();
        swapRoles();
        clearPoints();

        if (currentRound.round < ROUNDS_AMOUNT) {
            get().switch_on_waiting();
        } else {
            get().switch_on_report();
        }
    },

    onErrorExit: () => {
        const { clearGame, clearPoints }: ReportSlice & GamingSlice = get();
        clearGame();
        clearPoints();
    },

    // States
    step_on_settings: () => {
        const { setGameDate, setRoundTime }: ReportSlice = get();
        setGameDate();
        setRoundTime(1, INITIAL_ROUND_TIME);
        setRoundTime(2, INITIAL_ROUND_TIME);
        set({ isNewGame: true });
    },

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
        blockTimeSettings: false,
    }),

    switch_on_completion: () => set({
        gameState: 'Completion',
        isTimerRunning: false,
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
        const { isNewGame, saveGame }: GameMachine & ReportSlice = get();
        if (isNewGame) {
            saveGame((isOk: boolean)=>{
                if (isOk)  set({ isSuccessAlert: true });
            });
        } else {
            set({ isGameReport: false });
        }
    },

    hideSuccessAlert: () => set({
        isSuccessAlert: false, isGameReport: false, isNewGame: false
    })
});

