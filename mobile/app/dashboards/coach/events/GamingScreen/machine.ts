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
    isGameOverAlert: boolean;
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
    isGameOverAlert: false, //isGameOverAlert
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
        //alert('onTimerStart')
        const { gameStep }: GameMachine = get();

        if (gameStep === 'Settings')  {
            const { step_on_game, switch_on_playing }: GameMachine = get();
            step_on_game();
            switch_on_playing();
        } 
        if (gameStep === 'Game')  {
            const { switch_on_playing }: GameMachine = get();
            switch_on_playing();
        } 
    },

    onTimerStop: () => {
        //alert('onTimerStop')
        const { switch_on_completion }: GameMachine = get();
        switch_on_completion();
    },

    onTimerFinish: () => {
        const { switch_on_completion }: GameMachine = get();
        switch_on_completion();
    },

    onNavbarBack: () => {
        const { gameStep }: GameMachine = get();

        if (gameStep === 'Game') {
            set({ isBackAlert: true });
        } 
    },

    onEvadersConfirm: () => {
        const {  currentRound, swapRoles, clearPoints }: ReportSlice & GamingSlice & GameMachine = get();
        swapRoles();
        clearPoints();
        if (currentRound.round < ROUNDS_AMOUNT) {
            const { switch_on_waiting, setNextRound }: ReportSlice & GamingSlice & GameMachine = get();
            setNextRound();
            switch_on_waiting();
        } else {
            const { step_on_report }: GameMachine = get();
            step_on_report();
        }
    },

    onErrorExit: () => {
        const { clearGame, clearPoints, step_on_settings }: ReportSlice & GamingSlice & GameMachine = get();
        clearGame();
        clearPoints();
        step_on_settings()
    },

    // States
    step_on_settings: () => {
        const { setGameDate, setRoundTime }: ReportSlice = get();
        setGameDate();
        setRoundTime(1, INITIAL_ROUND_TIME);
        setRoundTime(2, INITIAL_ROUND_TIME);
        set({ gameStep: 'Settings', gameState: 'Waiting',
            isNewGame: true, isBackAlert: false, isTimerRunning: false, isHeader: true,
            isEvadersDialog: false, isGameOverAlert: false, isSuccessAlert: false,
             blockTimeSettings: false, blockPlayersAdding: false, blockRoleChosing: false, blockPointsAdding: true
            });
        },

    step_on_game: () => set({
        gameStep: 'Game',
        blockTimeSettings: true,
        blockPlayersAdding: true,
        blockRoleChosing: true,
    }),

    switch_on_playing: () => {
        //alert('switch_on_playing')
        const { setStartTime, currentRound}: ReportSlice & GamingSlice= get();
        setStartTime(currentRound.round);

        set({
            gameState: 'Playing',
            isTimerRunning: true,
            blockPointsAdding: false,
        })
    },

    switch_on_waiting: () => set({
        gameState: 'Waiting',
        blockTimeSettings: false,
        isEvadersDialog: false,
    }),

    switch_on_completion: () => set({
        gameState: 'Completion',
        isTimerRunning: false,
        isEvadersDialog: true
    }),

    step_on_report: () => set({
        gameStep: 'Report', gameState: 'Waiting',
        isEvadersDialog: false,
        isGameOverAlert: true,
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
            set({ isGameOverAlert: false });
        }
    },

    hideSuccessAlert: () => set({
        isSuccessAlert: false, isGameOverAlert: false, isNewGame: false
    })
});

