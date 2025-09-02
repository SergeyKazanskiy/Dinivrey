import { Game, Gamer, Role, Team, Total, TeamTotals } from '../model';
import { objectToJson } from '../../../../shared/utils';
import { add_event_game, add_event_game_gamers } from '../http';
import { EventsSlice } from '../EventsScreen/state';
import { getTodayTimestamp } from '../../../../shared/utils';
import { GamingSlice } from './state';
import { BONUS_POINTS } from './constants';
import { AttendanceSlice } from '../AttendanceScreen/state';


export interface ReportSlice {
    // Data
    game: Game;
    gamers: Gamer[];

    // Setup
    gameDate: number;
    first_chaser_team: Team;

    round_times: number[];
    timer_start_time: number; 

    // Temp
    survived_ids: number[];
    bonus_points: number;
    
    // Result
    times_total: number[];
    teams_totals: TeamTotals[];

    winner_number: number | null;
    winner: Team | null;
    isReportButton: boolean;

    // Setters
    setGameDate: () => void;
    setFirstShaserTeam: (first_chaser_team: Team) => void;

    setRoundTime: (round: number, time: number) => void;
    setStartTime: (round: number) => void;
    setTimeTotal: (round: number, time: number) => void;

    setServivied: (survived_ids: number[]) => void; // From EvadersDialog
    setBonusPoints: (bonus_points: number) => void; // From EvadersDialog

    // Prepare
    createGamers: () => void; // First round finished (Waiting state)
    updateGamers: () => void; // Second round finished (Report step)

    setGameFromServer: (game: Game) => void;
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
        
        points1: 10,
        points2: 10,
        tags: 20,
        rescues: 30,
        winner: Team.GREEN,
        presence: ''
    },
    gamers: [],

    // Setup
    gameDate: 0,
    first_chaser_team: Team.GREEN,

    round_times: [600, 600],
    timer_start_time: 0, 

    // Temp
    survived_ids: [],
    bonus_points: 0,

    // Result
    times_total:[],
    teams_totals:[{ team: Team.RED, amount: 0, caught: 0,  freeded: 0, survived: 0, bonus: 0, total: 0,
        info: { points: '0', tags: '0', bonus: '0', rescues: '0'}
    },
    { team: Team.GREEN, amount: 0, caught: 0,  freeded: 0, survived: 0, bonus: 0, total: 0,
        info: { points: '0', tags: '0', bonus: '0', rescues: '0'}
    },],

    winner_number: null,
    winner: null,
    isReportButton: false,

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

    setTimeTotal: (round: number, currentTime: number) => {
        const { round_times, times_total }: ReportSlice = get();
        const initialTime = round_times[round - 1];

        const playing_time = initialTime - currentTime;
        const updated = [...times_total];
        updated[round - 1] = playing_time
       
        set({ times_total:  updated});
    },

    setServivied: (survived_ids: number[]) => set({ survived_ids }),
    setBonusPoints: (bonus_points: number) => set({ bonus_points }),

    // Prepare
    createGamers: () => { // 1 round
        const { players, survived_ids, first_chaser_team, calculateWinner }: GamingSlice & ReportSlice = get();

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
        calculateWinner(); //Warning ???
        set({ isReportButton: true });
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
        set({ isReportButton: false });
    },

    setGameFromServer: (game: Game) => set({
        round_times: [game.time1, game.time2],
        first_chaser_team: game.first_team,
        gameDate: game.timestamp,
        game
    }),

    calculateWinner: () => {
        const { gamers, first_chaser_team, times_total, currentRound }: GamingSlice & ReportSlice = get();
        const firstTeamGamers = gamers.filter(el => el.team === first_chaser_team ); //right team green
        const secondTeamGamers = gamers.filter(el => el.team !== first_chaser_team ); //left team red

        const total_1: Total = firstTeamGamers.reduce( // green
            (acc, gamer) => {
                acc.caught += gamer.caught;
                acc.freeded += gamer.freeded;
                acc.survived += gamer.is_survived ? 1 : 0;
                return acc;
            },
            { caught: 0, freeded: 0, survived: 0 }
        );
        const total_2: Total = secondTeamGamers.reduce( // red
            (acc, gamer) => {
                acc.caught += gamer.caught;
                acc.freeded += gamer.freeded;
                acc.survived += gamer.is_survived ? 1 : 0;
                return acc;
            },
            { caught: 0, freeded: 0, survived: 0 }
        );

        const isSecondRound = currentRound.round === 2;
        const timeWinner = times_total[0] < times_total[1] ? 0 : 1;

        const totals_1: TeamTotals = getTeamTotals( // green
            first_chaser_team === Team.GREEN ? Team.GREEN : Team.RED,
            firstTeamGamers.length,
            total_1,
            total_2.survived === 0 && total_1.caught > 0 ? BONUS_POINTS : 0
        )
        const totals_2: TeamTotals = getTeamTotals(
            totals_1.team === Team.GREEN ? Team.RED : Team.GREEN,
            secondTeamGamers.length,
            total_2,
            total_1.survived === 0 && total_2.caught > 0 ? BONUS_POINTS : 0
        )

        const timeMatters = total_1.survived === 0 && total_2.survived === 0;
        // const totalsEqually = totals_1.total === totals_2.total;
        // const timesEqually = times_total[0] === times_total[1];

        let winner_number = null;
        if (timeMatters) {
            winner_number = timeWinner;
        } else if (totals_1.total === totals_2.total) {
            winner_number = null;
        } else {
            winner_number = totals_1.total > totals_2.total ? 0 : 1;
        }

        // if (!totalsEqually) {
        //     winner_number = totals_1.total > totals_2.total ? 0 : 1;
        // } else if (totalsEqually && !timesEqually) {
        //     winner_number = times_total[0] < times_total[1] ? 0 : 1;
        // }  

        set({
            teams_totals: [totals_1, totals_2],
            winner: winner_number === null ? 'Equally' : winner_number === 0 ? totals_1.team : totals_2.team
        });
    },

    // Server
    saveGame: (callback) => {
        const { event_id, group_id, attendances }: EventsSlice & AttendanceSlice = get();
        const { gameDate, first_chaser_team, times_total, gamers }: ReportSlice = get();
        const { teams_totals, winner, winner_number }: ReportSlice = get();

        const stats = getGamePresenceStats(gamers)
        const presence = attendances.length + ',' + stats.total + ',' + stats.red + ',' + stats.green;
        
        const data: Omit<Game, 'id'> = {
            event_id, 
            group_id,
            timestamp: gameDate,
            first_team: first_chaser_team,
            time1: times_total[0],
            time2: times_total[1],
            points1: teams_totals[0].total,
            points2: teams_totals[1].total,
            tags: teams_totals[0].caught + teams_totals[1].caught,
            rescues: teams_totals[0].freeded + teams_totals[1].freeded,
            winner: winner || 'Equally',
            presence
        }

        add_event_game(data, (res => {
            if (res.id > 0) {
                const { gamers }: ReportSlice = get();
                const complitedGamers: Gamer[] = gamers.map(el => ({...el, game_id: res.id, student_id: el.student_id | 0}))

                add_event_game_gamers(complitedGamers, (res => {
                    alert(objectToJson(res))

                    
                    if (res.notifications) {
                        res.notifications.forEach(el => {
                            el.added = el.achievements.filter(item => item.isNew).length;
                            el.updated = el.achievements.filter(item => !item.isNew).length;
                        });
                        set((state: AttendanceSlice) => ({
                            notifications: state.notifications.concat(res.notifications)
                        }))
                    }

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
        winner_number: null,
        winner: "Green",
        teams_totals:[{ team: Team.RED, amount: 0, caught: 0,  freeded: 0, survived: 0, bonus: 0, total: 0,
            info: { points: '0', tags: '0', bonus: '0', rescues: '0'}
        },
        { team: Team.GREEN, amount: 0, caught: 0,  freeded: 0, survived: 0, bonus: 0, total: 0,
            info: { points: '0', tags: '0', bonus: '0', rescues: '0'}
        },],
    }),
});

function getTeamTotals(team: Team, amount: number, total: Total, bonus: number): TeamTotals {
    const points =  total.caught + total.freeded + total.survived * 2;

    const totals: TeamTotals = {
        team,
        amount,
        caught: total.caught, // tags
        freeded: total.freeded, // rescues
        survived: total.survived * 2,
        bonus,
        total: 0, info: { points: '', tags: '', bonus: '', rescues: ''}
    };
    
    const pointsWithBonus = totals.bonus + points;
    totals.total = totals.caught + totals.freeded + totals.survived + totals.bonus
    totals.info = {
        points: totals.freeded + '+' + totals.survived + '+' + totals.caught + '+' + totals.bonus + '=' + pointsWithBonus, 
        tags: totals.caught + '',
        bonus: totals.bonus > 0 ? String(totals.bonus) : '',
        rescues: totals.freeded + '+' + totals.survived}

    return totals
}

function getGamePresenceStats(gamers: Gamer[]): { total: number, red: number, green: number } {
    const stats = gamers.reduce(
        (acc, gamer) => {
            acc.total += 1;

            if (gamer.team === Team.RED) {
                acc.red += 1;
            } else if (gamer.team === Team.GREEN) {
                acc.green += 1;
            }

            return acc;
        },
        { total: 0, red: 0, green: 0 }
    );
    return stats
}