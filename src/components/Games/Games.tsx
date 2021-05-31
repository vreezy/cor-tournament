import React from 'react';

// helper
import { v4 as uuidv4 } from 'uuid';
import { Spinner, SpinnerSize  } from '@fluentui/react';

// services
import { getAzureTableEntities } from '../../services/AzureService';

// constantes
import { constants } from '../../constants';

// interfaces
import { IGame } from '../../interfaces/IGame';
import { ITeam } from '../../interfaces/ITeam';
import { IMap } from '../../interfaces/IMap';

import { 
   DetailsList,
   DetailsListLayoutMode,
   SelectionMode,
   IColumn
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

function Games() {
   const [loading, setLoading] = React.useState(false);


   // const [participants, setParticipants] = React.useState<IParticipant[]>([]);
   // const [teams, setTeams] = React.useState<ITeam[]>([]);

   const [gamesCompared, setGamesCompared] = React.useState<IGameCompared[]>([]);

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
               etag: game.etag,
               partitionKey: game.partitionKey,
               rowKey: game.rowKey,
               timestamp: game.timestamp,
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

         setGamesCompared(gamesCompared);


         setLoading(false);
      }
      fetchParticipants();
   
      return () => {
      // returned function will be called on component unmount    
      }
   }, [setGamesCompared]);

   const columns: IColumn[] = [
      {
         key: uuidv4(),
         name: 'Datum',
         // fieldName: 'gameDateTime.value',
         minWidth: 50,
         maxWidth: 60,
         isRowHeader: true,
         isResizable: true,
         // isSorted: true,
         // isSortedDescending: false,
         // sortAscendingAriaLabel: 'Sorted A to Z',
         // sortDescendingAriaLabel: 'Sorted Z to A',
         //onColumnClick: this._onColumnClick,
         onRender: (item: IGameCompared) => {
            return <span>{new Date(item.gameDateTime.value).toLocaleDateString()}</span>
            
         },
         data: 'string',
         //isPadded: true,
       },
       {
         key: uuidv4(),
         name: 'Uhrzeit',
         // fieldName: 'gameDateTime.value',
         minWidth: 50,
         maxWidth: 60,
         isRowHeader: true,
         isResizable: true,
         //isSorted: true,
         //isSortedDescending: false,
         //sortAscendingAriaLabel: 'Sorted A to Z',
         //sortDescendingAriaLabel: 'Sorted Z to A',
         //onColumnClick: this._onColumnClick,
         onRender: (item: IGameCompared) => {
            return <span>{new Date(item.gameDateTime.value).toLocaleTimeString()}</span>
            
         },
         // data: 'string',
         //isPadded: true,
       },
       {
        key: uuidv4(),
        name: 'Team1',
        fieldName: 'team1Name',
        minWidth: 150,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
      //   isSorted: true,
      //   isSortedDescending: false,
      //   sortAscendingAriaLabel: 'Sorted A to Z',
      //   sortDescendingAriaLabel: 'Sorted Z to A',
        //onColumnClick: this._onColumnClick,
      //   onRender: (item: IGameCompared) => {
      //    return <div className="badge badge-primary font-weight-light p-2" style={{fontSize: "1.0rem"}}>{item.team1Name}</div>
         
      // },
        data: 'string',
        //isPadded: true,
      },
      {
         key: uuidv4(),
         name: '',
         fieldName: 'punktet1',
         minWidth: 30,
         maxWidth: 80,
         isRowHeader: true,
         //isResizable: true,
         //isSorted: true,
         //isSortedDescending: false,
         //sortAscendingAriaLabel: 'Sorted A to Z',
         //sortDescendingAriaLabel: 'Sorted Z to A',
         //onColumnClick: this._onColumnClick,
         data: 'string',
         //isPadded: true,
       },
       {
         key: uuidv4(),
         name: '',
         fieldName: 'punktet2',
         minWidth: 30,
         maxWidth: 80,
         isRowHeader: true,
         //isResizable: true,
         //isSorted: true,
         //isSortedDescending: false,
         //sortAscendingAriaLabel: 'Sorted A to Z',
         //sortDescendingAriaLabel: 'Sorted Z to A',
         //onColumnClick: this._onColumnClick,
         data: 'string',
         //isPadded: true,
       },
      {
         key: uuidv4(),
         name: 'Team2',
         fieldName: 'team2Name',
         minWidth: 150,
         maxWidth: 350,
         isRowHeader: true,
         isResizable: true,
         // isSorted: true,
         // isSortedDescending: false,
         // sortAscendingAriaLabel: 'Sorted A to Z',
         // sortDescendingAriaLabel: 'Sorted Z to A',
         //onColumnClick: this._onColumnClick,
         data: 'string',
         //isPadded: true,
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
      <div className="container mt-4">
         <div className="row">
            <div className="col">
               <h2>Spielplan ({gamesCompared.length})</h2>
            </div>
         </div>
         
         {loading && 
            <div className="row m-1 p-4 align-items-center justify-content-center border border-fix border-secondary rounded ">
               <div className="col col-auto p-5"><Spinner label="Loading..." size={SpinnerSize.large}/></div>
            </div> 
         }

         <DetailsList
            items={gamesCompared}
            compact={false}
            columns={columns}
            selectionMode={SelectionMode.none}
            // getKey={this._getKey}
            // setKey="multiple"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            //selection={this._selection}
            //selectionPreservedOnEmptyClick={true}
            //onItemInvoked={this._onItemInvoked}
            //enterModalSelectionOnTouch={true}
            //ariaLabelForSelectionColumn="Toggle selection"
            //ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            //checkButtonAriaLabel="select row"
         />
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

// function Team() {
//    return (

//    )

// }

export default Games;