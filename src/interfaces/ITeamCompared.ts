import { ITeam } from './ITeam';
import { IParticipant } from './IParticipant';

export interface ITeamCompared extends ITeam {
    users: IParticipant[];
    scores: number;
    rank: number;
    wins: number;
    draws: number;
    looses: number;
    pointsSelf: number;
    pointsEnemy: number;
 }