import { IParticipant } from '../interfaces/IParticipant';
import { ITeam } from '../interfaces/ITeam';
import { IGame } from '../interfaces/IGame';
import { IMap } from '../interfaces/IMap';

import { ITeamCompared } from '../interfaces/ITeamCompared';

export const compareTeams = (teams: ITeam[], participants:IParticipant[], games: IGame[], maps: IMap[] ): ITeamCompared[] => {
    const teamsCompared:ITeamCompared[] =  teams.map((team: ITeam) => {
        const users = participants.filter(p => p.teamRowKey === team.rowKey);
        var scores: number = 0;
        var pointsSelf: number = 0;
        var pointsEnemy: number = 0;
        var wins: number = 0;
        var looses: number = 0;
        var draws: number = 0;
        games.forEach((game: IGame) => {
        if(game.team1RowKey === team.rowKey) {
            if(!isNaN(parseInt(game.punktet1)) && !isNaN(parseInt(game.punktet2))) {
                pointsSelf += parseInt(game.punktet1);
                pointsEnemy += parseInt(game.punktet2) ;
            }

            if(parseInt(game.punktet1) > parseInt(game.punktet2)) {
                wins++;
                scores += 3;
            }

            if(parseInt(game.punktet2) > parseInt(game.punktet1)) {
                looses++;
            }

            if(parseInt(game.punktet1) === parseInt(game.punktet2)) {
                draws++;
                scores += 1;
            }
        }

        if(game.team2RowKey === team.rowKey) {
            if(!isNaN(parseInt(game.punktet2)) && !isNaN(parseInt(game.punktet1))) {
                pointsSelf += parseInt(game.punktet2);
                pointsEnemy += parseInt(game.punktet1);
                if(parseInt(game.punktet2) > parseInt(game.punktet1)) {
                    wins++;
                    scores += 3;
                }

                if(parseInt(game.punktet1) > parseInt(game.punktet2)) {
                    looses++;
                }

                if(parseInt(game.punktet1) === parseInt(game.punktet2)) {
                    draws++;
                    scores += 1;
                }
            }
        }
        });

        
        return {
            etag: team.etag,
            map1: maps.find((m: IMap) => {return m.rowKey === team.map1})?.name || "Fehler",
            map2: maps.find((m: IMap) => {return m.rowKey === team.map2})?.name || "Fehler",
            name: team.name,
            partitionKey: team.partitionKey,
            rowKey: team.rowKey,
            timestamp: team.timestamp,
            users,
            scores,
            rank: 0,
            wins,
            draws,
            looses,
            pointsSelf,
            pointsEnemy
        }
    });

    const teamsComparedSorted: ITeamCompared[] = teamsCompared.sort((a: ITeamCompared, b: ITeamCompared) => {
        if(b.scores === a.scores) {
            return b.pointsSelf - a.pointsSelf;
        } 
        if(b.scores > a.scores) {
            return 1
        }
        if(b.scores < a.scores) {
            return -1
        }
        return -1
        // return a.scores > b.scores ? 1 : -1;
    });

    var rank = 0
    const teamsComparedRanked: ITeamCompared[] = teamsComparedSorted.map((team: ITeamCompared, index: number) => {
    if(index > 0 && teamsComparedSorted[index -1].scores === team.scores && teamsComparedSorted[index -1].pointsSelf === team.pointsSelf) {
        team.rank = teamsComparedSorted[index -1].rank;
        rank++;
    }
    else {
        team.rank = ++rank;
    }
    
    return team;
    });

    return teamsComparedRanked;
}