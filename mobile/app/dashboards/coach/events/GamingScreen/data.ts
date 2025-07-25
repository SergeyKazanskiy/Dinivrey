import { Game, Gamer, Role, Team, Total, TeamTotals } from '../model';
import { objectToJson } from '../../../../shared/utils';
import { add_event_game, add_event_game_gamers, delete_event_game } from '../http';
import { EventsSlice } from '../EventsScreen/state';
import { getTodayTimestamp } from '../../../../shared/utils';
import { GamingSlice } from './state';
import { BONUS_POINTS } from './constants';


export interface ReportSlice {
    // Data
    game: Game;
    gamers: Gamer[];

    // Setup
    gameDate: number;
    first_chaser_team: Team;
    timer_start_time: number; 

    // Temp
    survived_ids: number[];
    bonus_points: number;
    
    // Result
    round_times: number[];
    teams_totals: TeamTotals[];

    winner_number: number | null;
    winner: Team | null; 

    // Setters
    setGameDate: () => void;
    setFirstShaserTeam: (first_chaser_team: Team) => void;

    setRoundTime: (round: number, time: number) => void;
    setStartTime: (round: number) => void;

    setServivied: (survived_ids: number[]) => void; // From EvadersDialog
    setBonusPoints: (bonus_points: number) => void; // From EvadersDialog

    // Prepare
    createGamers: () => void; // First round finished (Waiting state)
    updateGamers: () => void; // Second round finished (Report step)

    calculateWinner: () => void; // before opening the report (Report step)

    // Server with
    saveGame: (callback: (isOk: boolean) => void) => void ; // after closing the report (Report step)
    clearGame: () => void;
}

export const createReportSlice = (set: any, get: any): ReportSlice => ({
    // Data
    game: {
        id: 0,
        event_id: 0,
        group_id: 0,
        timestamp: 0,
        first_team: Team.GREEN,

        time1: 600,
        time2: 600,
        
        points: 10,
        tags: 20,
        rescues: 30,
        winner: Team.GREEN
    },
    gamers: [],

    // Setup
    gameDate: 0,
    first_chaser_team: Team.GREEN,
    timer_start_time: 0, 

    // Temp
    survived_ids: [],
    bonus_points: 0,

    // Result
    teams_totals: [
        { team: Team.RED, amount: 5, caught: 1,  freeded: 2, survived: 3, bonus: 0, total: 0,
            info: { points: '11', tags: '12', bonus: '13', rescues: '14'}
        },
        { team: Team.GREEN, amount: 4, caught: 1,  freeded: 2, survived: 3, bonus: 0, total: 0,
            info: { points: '21', tags: '22', bonus: '23', rescues: '24'}
        },
    ],
    round_times: [600, 600],

    winner_number: null,
    winner: null,

    // Setters
    setGameDate: () => set({ gameDate: getTodayTimestamp()}),
    setFirstShaserTeam: (first_chaser_team: Team) => set({ first_chaser_team }),

    setRoundTime: (round: number, time: number) => {
        set((state: ReportSlice) => {
            const updated = [...state.round_times];
            updated[round - 1] = time;
            return { round_times: updated };
        })

        const { setStartTime }: ReportSlice = get();
        setStartTime(round);
    },
    
    setStartTime: (round: number) => {
        const { round_times }: ReportSlice = get();

        set({ timer_start_time: round_times[round - 1] })
    },

    setServivied: (survived_ids: number[]) => set({ survived_ids }),
    setBonusPoints: (bonus_points: number) => set({ bonus_points }),

    // Prepare
    createGamers: () => { // 1 round
        const { players, survived_ids, first_chaser_team }: GamingSlice & ReportSlice = get();

        const gamers: Gamer[] = players.map(el => ({
            student_id: el.id,
            name: el.name,
            team: el.team,
            caught: el.team === first_chaser_team ? el.points : 0,
            freeded: el.team !== first_chaser_team ? el.points : 0,
            is_survived: survived_ids.includes(el.id)
        }));
        //alert(objectToJson(gamers))
        set({ gamers });
    },

    updateGamers: () => { // 2 round
        const { gamers, players, survived_ids, calculateWinner }: GamingSlice & ReportSlice = get();

        const updated = gamers.map((gamer, index) => {
            const player = players[index];
            const isChaser = player.role === Role.CHASER;
            
            return {
                ...gamer,
                caught: isChaser ? player.points : gamer.caught,
                freeded: !isChaser ? player.points : gamer.freeded,
                is_survived: !isChaser ? survived_ids.includes(player.id) : gamer.is_survived,
            };
        });
        //alert(objectToJson(updated))
        set({ gamers: updated });
        calculateWinner();
    },

    calculateWinner: () => {
        const { gamers, first_chaser_team, round_times }: GamingSlice & ReportSlice = get();
        const firstTeamGamers = gamers.filter(el => el.team === first_chaser_team );
        const secondTeamGamers = gamers.filter(el => el.team !== first_chaser_team );

        const total_1: Total = firstTeamGamers.reduce(
            (acc, gamer) => {
                acc.caught += gamer.caught;
                acc.freeded += gamer.freeded;
                acc.survived += gamer.is_survived ? 1 : 0;
                return acc;
            },
            { caught: 0, freeded: 0, survived: 0 }
        );
        const total_2: Total = secondTeamGamers.reduce(
            (acc, gamer) => {
                acc.caught += gamer.caught;
                acc.freeded += gamer.freeded;
                acc.survived += gamer.is_survived ? 1 : 0;
                return acc;
            },
            { caught: 0, freeded: 0, survived: 0 }
        );

        const totals_1: TeamTotals = getTeamTotals(
            first_chaser_team === Team.GREEN ? Team.GREEN : Team.RED,
            firstTeamGamers.length,
            total_1, total_2.survived === 0 ? BONUS_POINTS : 0
        )

        const totals_2: TeamTotals = getTeamTotals(
            totals_1.team === Team.GREEN ? Team.GREEN : Team.RED,
            firstTeamGamers.length,
            total_2, total_1.survived === 0 ? BONUS_POINTS : 0
        )

        const winner_number = totals_1.total > totals_2.total ? 0
            : totals_2.total > totals_1.total ? 1
            : round_times[0] < round_times[1] ? 0
            : round_times[1] < round_times[0] ? 1
            : null;  

        set({
            teams_totals: [totals_1, totals_2],
            winner: winner_number === null ? 'Equally' : winner_number === 0 ? totals_1.team : totals_2.team
        });

        //alert(objectToJson([[totals_1, totals_2]]))
    },

    // Server
    saveGame: (callback) => {
        const { event_id, group_id }: EventsSlice = get();
        const { gameDate, first_chaser_team, round_times }: ReportSlice = get();
        const { teams_totals, winner, winner_number }: ReportSlice = get();
        const n = winner_number ? winner_number : 0
        
        const data: Omit<Game, 'id'> = {
            event_id,  group_id, timestamp: gameDate, first_team: first_chaser_team,
            time1: round_times[0], time2: round_times[1],
            points: teams_totals[n].total,
            tags: teams_totals[n].caught,
            rescues: teams_totals[n].freeded, winner: winner || 'Equally'
        }
        //alert(objectToJson(data)) //!!!

        add_event_game(data, (res => {
            if (res.id > 0) {
                const { gamers }: ReportSlice = get();
                const complitedGamers: Gamer[] = gamers.map(el => ({...el, game_id: res.id, student_id: el.student_id | 0}))

                //alert(objectToJson(complitedGamers)) //!!!
                add_event_game_gamers(complitedGamers, (res => {
                    callback(res.isOk);
                }));
            }
        }));
    },

    clearGame: () => set({
        gamers: [],
        first_team: "Green",
        survived_ids: [],
        bonus_points: [],
        round_times: [600, 600],
        teams_totals: [],
        winner_number: null,
        winner: "Green",
    }),
});

function getTeamTotals(team: Team, amount: number, total: Total, bonus: number): TeamTotals {
    const totals: TeamTotals = {
        team,
        amount,
        caught: total.caught, // tags
        freeded: total.freeded, // rescues
        survived: total.survived * 2,
        bonus,
        total: 0, info: { points: '', tags: '', bonus: '', rescues: ''}
    }
    totals.total = totals.caught + totals.freeded + totals.survived + totals.bonus
    totals.info = { points: totals.freeded + '+' + totals.caught + '+' + totals.survived, 
        tags: totals.caught + '',
        bonus: totals.bonus > 0 ? String(totals.bonus) : '',
        rescues: totals.freeded + '+' + totals.survived}

    return totals
}