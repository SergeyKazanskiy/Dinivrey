import { Team, Role } from '../model';
import { objectToJson } from '../../../shared/utils';
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
    gameState: 'Waiting' | 'Playing' | 'Completion' | 'Correction'


    // Events
    onNavbarBack: () => void;
    onErrorExit: () => void;

    onTimerStart: () => void;
    onTimerStop: (time: number) => void;
    onTimerFinish: () => void;

    onEvadersConfirm: () => void;
    onFixPoints: () => void;

    // States
    step_on_settings: () => void;
    step_on_game: () => void;
        switch_on_playing: () => void;
        switch_on_waiting: () => void;
        switch_on_completion: () => void;
        switch_on_correction: (pointsDifference: number) => void;
    step_on_report: () => void;

    // Actions
    hideBackAlert: () => void; // Cancel ??? if agree?
    hideGameReport: () => void;
    hideSuccessAlert: () => void;
    hideCheckingAlert: () => void;

    showReport: () => void; //Temp
    hideReport: () => void;  //Temp
}

export const createGameMachine = (set: any, get: any): GameMachine => ({
    isNewGame: true,
    isBackAlert: false,
    isEvadersDialog: false,
    isGameOverAlert: false,
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
        const { isPointsFixing, gameStep, switch_on_completion }: GameMachine & GamingSlice = get();

        if (isPointsFixing) {
            set({isPointsFixing: false});
            switch_on_completion();
            return;
        }

        if (gameStep === 'Settings')  {
            const { step_on_game, switch_on_playing }: GameMachine = get();
            step_on_game();
            switch_on_playing();
        } 
        if (gameStep === 'Game')  {
            const { switch_on_playing, isPointsFixing }: GameMachine & GamingSlice = get();
            switch_on_playing();
        } 
    },

    onTimerStop: (time: number) => {
        const { switch_on_completion, setTimeTotal, currentRound }: GameMachine & ReportSlice & GamingSlice = get();
        setTimeTotal(currentRound.round, time);
        switch_on_completion();
    },

    onTimerFinish: () => {
        const { switch_on_completion, setTimeTotal, currentRound, round_times }: GameMachine & ReportSlice & GamingSlice = get();
        const round = currentRound.round
        setTimeTotal(round, round_times[round - 1]);
        switch_on_completion();
    },

    onNavbarBack: () => {
        const { gameStep }: GameMachine = get();

        if (gameStep === 'Game') {
            set({ isBackAlert: true });
        } 
    },

    onEvadersConfirm: () => {
        const { currentRound, players, survived_ids }: ReportSlice & GamingSlice & GameMachine = get();
        const { swapRoles, clearPoints, switch_on_correction }: ReportSlice & GamingSlice & GameMachine = get();

        const chasers = players.filter(el => el.role === Role.CHASER);
        const evaders = players.filter(el => el.role === Role.EVADER);

        const chasersPoints = chasers.reduce((acc, player) => acc += player.points, 0);
        const evadersPoints = evaders.reduce((acc, player) => acc += player.points, 0);
        const taggedAmount = evaders.length - survived_ids.length;

        const pointsDifference = Math.abs(chasersPoints - (evadersPoints + taggedAmount))

        if (pointsDifference > 0) {
            switch_on_correction(pointsDifference);
        } else {
            if (currentRound.round < ROUNDS_AMOUNT) {
                const { switch_on_waiting, setNextRound, createGamers, setRoundTime, round_times }: ReportSlice & GamingSlice & GameMachine = get();
                createGamers();
                setNextRound();
                setRoundTime(2, round_times[0])
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

    onFixPoints: () =>  set({
        isEvadersDialog: false,
        isCheckingAlert: false,
        isPointsFixing: true,
    }),

    // Staps and States
    step_on_settings: () => {
        const { setGameDate, setRoundTime }: ReportSlice = get();
        setGameDate();
        setRoundTime(1, INITIAL_ROUND_TIME);
        setRoundTime(2, INITIAL_ROUND_TIME);
        set({ gameStep: 'Settings', gameState: 'Waiting', isPointsFixing: false, times_total:[],
            isNewGame: true, isBackAlert: false, isTimerRunning: false, isHeader: true,
            isEvadersDialog: false, isGameOverAlert: false, isSuccessAlert: false,
            blockTimeSettings: false, blockPlayersAdding: false, blockRoleChosing: false, blockPointsAdding: true,
            currentRound: { round: 1, teams: [ {team: Team.RED, role: Role.EVADER}, {team: Team.GREEN, role: Role.CHASER}]},
            isReportButton: false,
            });
        },

    step_on_game: () => set({
        gameStep: 'Game',
        blockTimeSettings: true,
        blockPlayersAdding: true,
        blockRoleChosing: true,
    }),

    switch_on_playing: () => {
        const { setStartTime, currentRound}: ReportSlice & GamingSlice= get();
        setStartTime(currentRound.round);

        set({
            gameState: 'Playing',
            isTimerRunning: true,
            blockPointsAdding: false,
            isReportButton: false,
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

    switch_on_correction: (pointsDifference: number) => set({
        gameState: 'Correction',
        pointsDifference,
        isCheckingAlert: true,
    }),

    step_on_report: () => set({
        gameStep: 'Report', gameState: 'Waiting',
        isEvadersDialog: false,
        isGameReport: true,
    }),

    // Actions
    hideBackAlert: () => set({ isBackAlert: false }),

    hideGameReport: () => {
        const { gameStep }: GameMachine= get();
        set({ isGameReport: false })
        
        if (gameStep === 'Report') {
            set({ isGameOverAlert: true })
        }
        // const { saveGame }: GameMachine & ReportSlice = get();
        //     saveGame((isOk: boolean)=>{
        //         if (isOk) set({ isGameOverAlert: true });
        //     });
    },

    hideSuccessAlert: () => set({
        isSuccessAlert: false, isGameOverAlert: false, isNewGame: false
    }),
    hideCheckingAlert: () => set({ isCheckingAlert: false }),

    showReport: () => set({ isGameReport: true }),
    hideReport: () => set({ isGameReport: false }),
});

