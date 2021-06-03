import React from 'react';

// helper
import { v4 as uuidv4 } from 'uuid';
import { Spinner, SpinnerSize  } from '@fluentui/react';
import moment from 'moment';

// services
import { getAzureTableEntities } from '../../services/AzureService';

// constantes
import { constants } from '../../constants';

// interfaces
import { IGame } from '../../interfaces/IGame';
import { ITeam } from '../../interfaces/ITeam';
import { IMap } from '../../interfaces/IMap';

import './Games.scss';

import { 
   DetailsList,
   DetailsListLayoutMode,
   SelectionMode,
   IColumn,
   IGroup   
} from '@fluentui/react/lib/DetailsList';

interface IGameCompared extends IGame {
   team1Name: string;
   team2Name: string;
   map1: string;
   map2: string;
   map3: string;
   map4: string;
}

class FakeTeam {
   name: string;
   map1: string;
   map2: string;


   constructor() {
      this.name = "Fehler";
      this.map1 = "Fehler";
      this.map2 = "fehler";
   }
}


// const groups: any[] = [
//    {
//       key: uuidv4(),
//       name: 'KW: "22"',
//       startIndex: 0,
//       count: 4,
//       level: 0
//    },
//    {
//       key: uuidv4(),
//       name: 'KW: "23"',
//       startIndex: 4,
//       count: 4,
//       level: 0
//    },
//    {
//       key: uuidv4(),
//       name: 'KW: "24"',
//       startIndex: 8,
//       count: 4,
//       level: 0
//    }
// ]



function Games() {
   const [loading, setLoading] = React.useState(false);
   const [gamesCompared, setGamesCompared] = React.useState<IGameCompared[]>([]);
   const [groups, setGroups] = React.useState<IGroup[]>([]);

   React.useEffect(() => {
      const fetchParticipants = async () => {
         setLoading(true);
         const promises: Promise<any>[] = [];
         promises.push(getAzureTableEntities(constants.azureAccount, "games"));
         promises.push(getAzureTableEntities(constants.azureAccount, "teams"));
         promises.push(getAzureTableEntities(constants.azureAccount, "maps"));
         const results = await Promise.all(promises);
         const games: IGame[] = results[0];
         const teams: ITeam[] = results[1];
         const maps: IMap[] = results[2];


         const gamesFiltered = games.sort((a: IGame, b: IGame) => {
            return new Date(a.gameDateTime.value).getTime() - new Date(b.gameDateTime.value).getTime();
         });

         const mapRowKeys: string[] = maps.map(m => m.rowKey);

         var mapCount: number = 0;
         const gamesCompared: IGameCompared[] = gamesFiltered.map((game: IGame) => {
            const team1: ITeam | FakeTeam = teams.find(t => t.rowKey === game.team1RowKey) || new FakeTeam();
            const team2: ITeam | FakeTeam = teams.find(t => t.rowKey === game.team2RowKey) || new FakeTeam();

            const team1Maps = [team1.map1, team1.map2];
            const allTeamMaps = [...team1Maps, team2.map1, team2.map2];

            const mapRowKeysFiltered = mapRowKeys.filter((m: string) => {
               return !allTeamMaps.includes(m);
            });

            const map1 = maps.find((m: IMap) => {return m.rowKey === team1.map1})?.name || "Fehler"
            const map2 = maps.find((m: IMap) => {return m.rowKey === team1.map2})?.name || "Fehler"

            var map3 = "toDo";
            var map4 = "toDo";
            
            if(team1Maps.includes(team2.map1)){
               if(mapCount >= mapRowKeysFiltered.length){
                  mapCount = 0;
               }
               map3 = maps.find((m: IMap) => {return m.rowKey === mapRowKeysFiltered[mapCount]})?.name || "Fehler"
               mapCount += 2;
            }
            else {
               map3 = maps.find((m: IMap) => {return m.rowKey === team2.map1})?.name || "Fehler"
            }

            if(team1Maps.includes(team2.map2)){
               if(mapCount >= mapRowKeysFiltered.length){
                  mapCount = 1;
               }
               map4 = maps.find((m: IMap) => {return m.rowKey === mapRowKeysFiltered[mapCount]})?.name || "Fehler"
               mapCount += 2;
            }
            else {
               map4 = maps.find((m: IMap) => {return m.rowKey === team2.map2})?.name || "Fehler"
            }

            return {
               'odata.etag': game['odata.etag'],
               PartitionKey: game.PartitionKey,
               RowKey: game.RowKey,
               Timestamp: game.Timestamp,
               gameDateTime: game.gameDateTime,
               punktet1: game.punktet1,
               punktet2: game.punktet2,
               team1Name: team1.name,
               team1RowKey: game.team1RowKey,
               team2Name: team2.name,
               team2RowKey: game.team2RowKey,
               map1,
               map2,
               map3,
               map4

            }

         });

      
         const gameDateTimes: string[] = gamesCompared.map((g: IGameCompared) => { return g.gameDateTime.value});
         const gameDateTimesUnique: string[]  = uniq(gameDateTimes);

         const groups: IGroup[] = gameDateTimesUnique.map((gdt: string) => {
            const today = moment();
            const date = moment(new Date(gdt));
            const matchKW = date.isoWeek();
            const from_date = date.startOf('isoWeek').format("DD.MM.YYYY");
            const to_date = date.endOf('isoWeek').format("DD.MM.YYYY");

            const startIndex: number = gamesCompared.findIndex((g:IGameCompared) => {return g.gameDateTime.value === gdt});
            const gamesComparedThisGDT = gamesCompared.filter((g:IGameCompared) => {return g.gameDateTime.value === gdt});
 
            return ({
               key: uuidv4(),
               name: `KW: ${matchKW} | ${from_date} - ${to_date}`,
               startIndex,
               count: gamesComparedThisGDT.length,
               level: 0,
               isCollapsed: today.isoWeek() !== date.isoWeek(),


            });

         });

         setGroups(groups)
         setGamesCompared(gamesCompared);
         setLoading(false);
      }
      fetchParticipants();
   
      return () => {
      // returned function will be called on component unmount    
      }
   }, [setGamesCompared]);

   const columns: IColumn[] = [
      // {
      //    key: uuidv4(),
      //    name: 'KW',
      //    minWidth: 30,
      //    maxWidth: 50,
      //    isRowHeader: true,
      //    isResizable: true,
      //    onRender: (item: IGameCompared) => {
      //       const matchKW = moment(new Date(item.gameDateTime.value)).isoWeek();
      //       return <span>{matchKW}</span>
      //    },
      //    data: 'string',
      // },
      {
         key: uuidv4(),
         name: 'Team1',
         fieldName: 'team1Name',
         minWidth: 140,
         maxWidth: 180,
         isRowHeader: true,
         isResizable: true,
         isMultiline: true,
         className: "text-right",
         headerClassName: "headerRightClass",
         
         data: 'string'
      },
      {
         key: uuidv4(),
         name: 'Ergebnis',
         minWidth: 70,
         maxWidth: 70,
         isRowHeader: true,
         className: "text-center",
         headerClassName: "headerCenterClass",
         onRender: (item: IGameCompared) => {
            return (
               <span>
                  {item.punktet1}:{item.punktet2}
               </span>
            )
         }
      },
      {
         key: uuidv4(),
         name: 'Team2',
         fieldName: 'team2Name',
         minWidth: 140,
         maxWidth: 180,
         isRowHeader: true,
         isResizable: true,
         isMultiline: true,
         data: 'string'
      },
      {
         key: uuidv4(),
         name: 'Map1',
         fieldName: 'map1',
         minWidth: 100,
         maxWidth: 150,
         isRowHeader: true,
         isResizable: true,
         data: 'string',
      },
      {
         key: uuidv4(),
         name: 'Map2',
         fieldName: 'map2',
         minWidth: 100,
         maxWidth: 150,
         isRowHeader: true,
         isResizable: true,
         data: 'string',
      },
      {
         key: uuidv4(),
         name: 'Map3',
         fieldName: 'map3',
         minWidth: 100,
         maxWidth: 150,
         isRowHeader: true,
         isResizable: true,
         data: 'string',
      },
      {
         key: uuidv4(),
         name: 'Map4',
         fieldName: 'map4',
         minWidth: 100,
         maxWidth: 150,
         isRowHeader: true,
         isResizable: true,
         data: 'string',
      },
   ];



   return (
      <div className="container mt-4" >
         <div className="row">
            <div className="col" >
               <h2>Spielplan</h2> 

               {/* ({gamesCompared.length}) */}
            </div>
         </div>
         
         {loading && 
            <div className="row m-1 p-4 align-items-center justify-content-center border border-fix border-secondary rounded ">
               <div className="col col-auto p-5"><Spinner label="Loading..." size={SpinnerSize.large}/></div>
            </div> 
         }

         <p>
            Handelt für die angegeben Kalenderwoche (KW) mit euren Gegnern eine Spielzeit aus.
            Diese Spielzeit muss nicht bie der Turnierleitung bestätigt werden.
            Wenn Ihr gespielt habt, meldet das Ergebnis bei einem Turnierleiter. Dieser trägt das Ergebnis bald möglich ein.
         </p>
         
         <div style={{backgroundColor: "#282828"}}>
         <DetailsList
            items={gamesCompared}
            groups={groups}
            columns={columns}
            compact={false}
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
         />
         </div>
         {/* 
            {gamesCompared.map((game: IGameCompared) => {
               return (
                  <div key={uuidv4()} className="row m-1 p-4 align-items-center border border-fix border-secondary rounded ">
                     <div className="col col-auto p-2">
                        
                        {/* <div><pre>{JSON.stringify(game.gameDateTime, null, 2) }</pre></div> 
                        {new Date(game.gameDateTime.value).toLocaleDateString()} {new Date(game.gameDateTime.value).toLocaleTimeString()}

                        <div className="badge badge-primary font-weight-light p-2" style={{fontSize: "1.2rem"}}>{game.team1Name}</div>
                        {game.punktet1}
                        {game.punktet2}
                        <div className="badge badge-primary font-weight-light p-2" style={{fontSize: "1.2rem"}}>{game.team2Name}</div>
                        </div> 



                  </div> 
               )
            
            })}
            

         */}
      </div>         
   );
}

function uniq(a: string[]) {
   return Array.from(new Set(a));
}

export default Games;