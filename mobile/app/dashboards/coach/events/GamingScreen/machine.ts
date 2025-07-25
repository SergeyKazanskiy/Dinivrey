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
    isGameReport: boolean;
    isCheckingAlert: boolean;

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

    showReport: () => void; //Temp
    hideReport: () => void;  //Temp
}

export const createGameMachine = (set: any, get: any): GameMachine => ({
    isNewGame: true,
    isBackAlert: false,
    isEvadersDialog: false,
    isGameOverAlert: false, //isGameOverAlert
    isSuccessAlert: false,
    isGameReport: false,
    isCheckingAlert: false,

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
        
        if (1 === 1) {
            
        } else {
            if (currentRound.round < ROUNDS_AMOUNT) {
                const { switch_on_waiting, setNextRound, createGamers }: ReportSlice & GamingSlice & GameMachine = get();
                createGamers();
                setNextRound();
                switch_on_waiting();
            } else {
                const { step_on_report, updateGamers }: GameMachine & ReportSlice = get();
                updateGamers();
                step_on_report();
            }
            clearPoints();
            swapRoles();
        }
    },

    onErrorExit: () => {
        const { clearGame, clearPoints, step_on_settings, clearPlayers }: ReportSlice & GamingSlice & GameMachine = get();
        clearGame();
        clearPoints();
        clearPlayers();
        step_on_settings();
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
            blockTimeSettings: false, blockPlayersAdding: false, blockRoleChosing: false, blockPointsAdding: true,
            currentRound: { round: 1, teams: [{team: Team.GREEN, role: Role.CHASER}, {team: Team.RED, role: Role.EVADER}]},
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
        blockPointsAdding: true,
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
        isGameReport: true,
    }),

    // Actions
    hideBackAlert: () => set({ isBackAlert: false }),

    hideGameReport: () => {
        set({ isGameReport: false })

        const { saveGame }: GameMachine & ReportSlice = get();
            saveGame((isOk: boolean)=>{
                if (isOk) set({ isGameOverAlert: true });
            });
    },

    hideSuccessAlert: () => set({
        isSuccessAlert: false, isGameOverAlert: false, isNewGame: false
    }),

    showReport: () => set({ isGameReport: true }),
    hideReport: () => set({ isGameReport: false }),
});

