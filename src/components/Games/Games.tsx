import React from 'react';

// helper
import { v4 as uuidv4 } from 'uuid';
import { Spinner, SpinnerSize  } from '@fluentui/react';
import moment from 'moment';

// services
import { 
   getAzureTableEntities,
   setGame
 } from '../../services/AzureService';

// constantes
import { constants } from '../../constants';

// interfaces
import { IGame } from '../../interfaces/IGame';
import { ITeam } from '../../interfaces/ITeam';
import { IMap } from '../../interfaces/IMap';

import { ISetGameResponse } from '../../interfaces/ISetGameResponse';


import { 
   ISetGame,
   ISetGameEntity
} from '../../interfaces/ISetGame'

import './Games.scss';

import { 
   DetailsList,
   DetailsListLayoutMode,
   SelectionMode,
   IColumn,
   IGroup,
   PrimaryButton,
   TextField,
   MessageBar,
   MessageBarType,
   Stack,
   IStackTokens
} from '@fluentui/react';

import {columns as columnsNormal} from './columnsNormal';

import { globalStateContext } from '../../App';

export interface IGameCompared extends IGame {
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

enum Mode {
   Normal,
   Edit
}

enum Punkte {
   t1,
   t2
}

const itemAlignmentsStackTokens: IStackTokens = {
   childrenGap: 5,
   padding: 10,
};

function Games() {
   const [loading, setLoading] = React.useState(false);
   const [games, setGames] = React.useState<IGame[]>([]);
   const [gamesCompared, setGamesCompared] = React.useState<IGameCompared[]>([]);
   const [groups, setGroups] = React.useState<IGroup[]>([]);
   // const [mode, setMode] = React.useState<Mode>(Mode.Normal)
   const [token, setToken] = React.useState<string>("")

   const [messages, setMessages] = React.useState<ISetGameResponse[]>([])

   const { isAdmin } = React.useContext(globalStateContext);



   React.useEffect(() => {
      const initFetch = async () => {
         setLoading(true);
         const promises: Promise<any>[] = [];
         promises.push(getAzureTableEntities(constants.azureAccount, "games"));
         promises.push(getAzureTableEntities(constants.azureAccount, "teams"));
         promises.push(getAzureTableEntities(constants.azureAccount, "maps"));
         const results = await Promise.all(promises);
         const games: IGame[] = results[0];
         const teams: ITeam[] = results[1];
         const maps: IMap[] = results[2];

         console.log(games)


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
         setGames(games);
         setLoading(false);
      }
      initFetch();
   
      return () => {
      // returned function will be called on component unmount    
      }
   }, [setGamesCompared, setGroups, setLoading]);

   const saveChanges = async () => {

      const gamesToChange = gamesCompared.filter((gc: IGameCompared, ) => {
         const gameIndex = games.findIndex((g: IGame) => g.rowKey === gc.rowKey);

         if(games[gameIndex]?.punktet1 !== gc.punktet1) {
            console.log(games[gameIndex]?.rowKey + " , " +  gc.rowKey + " , " + games[gameIndex]?.punktet1 + " , " + gc.punktet1)
            return true;
         }

         if(games[gameIndex]?.punktet2 !== gc.punktet2) {
            console.log(games[gameIndex]?.rowKey + " , " +  gc.rowKey + " , " + games[gameIndex]?.punktet2 + " , " + gc.punktet2)
            return true;
         }

         return false;
      })

      const promises: Promise<any>[] = []
      for (const gtc of gamesToChange) {
         const entity: ISetGameEntity = {
            gameDateTime: gtc.gameDateTime.value,
            "gameDateTime@odata.type": "Edm.DateTime",
            punktet1: gtc.punktet1,
            punktet2: gtc.punktet2,
            team1RowKey: gtc.team1RowKey,
            team2RowKey: gtc.team2RowKey,
         }

         const sg: ISetGame = {
            token,
            partitionKey: gtc.partitionKey,
            rowKey: gtc.rowKey,
            entity
         }

         promises.push(setGame(sg))
      }

      const results = await Promise.all(promises);
      console.log(results)

      // update games
      const newGames: IGame[] = await getAzureTableEntities(constants.azureAccount, "games");
      setGames(newGames);      

      setMessages(results);
   }
      
   const onChangePunkte = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, rowKey: any, pEnum: Punkte, newValue?: string | undefined ) => {
      // console.log(event)
      //event.preventDefault();

      if(newValue !== undefined) {
         const gcClone: IGameCompared[] = JSON.parse(JSON.stringify(gamesCompared))

         const index = gcClone.findIndex((gc: IGameCompared) => gc.rowKey === rowKey)
         if(pEnum === Punkte.t1) {
            gcClone[index].punktet1 = newValue
         }

         if(pEnum === Punkte.t2) {
            gcClone[index].punktet2 = newValue
         }

         setGamesCompared(gcClone);
      }
   }



   const columnsEdit: IColumn[] = [
      {
         key: uuidv4(),
         name: 'RowKey',
         fieldName: 'rowKey',
         minWidth: 280,
         maxWidth: 300,
         isRowHeader: true,
         isResizable: true,
         // isMultiline: true,
         className: "text-right",
         headerClassName: "headerRightClass",
         
         data: 'string'
      },
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
         minWidth: 200,
         maxWidth: 240,
         isRowHeader: true,
         className: "text-center",
         headerClassName: "headerCenterClass",
         onRender: (item: IGameCompared) => {
            var errorMessage = "";
            if(!isNaN(parseInt(item.punktet1)) || !isNaN(parseInt(item.punktet2))) {
               const total = parseInt(item.punktet1) + parseInt(item.punktet2);
               if(total !== 40){
                  errorMessage = "Total ist nicht 40";
               } 
            }
            else if(item.punktet1 !== '-' || item.punktet2 !== '-'){
               errorMessage = 'Bitte "-" nutzen';
            }

            return (

               <span className="d-flex flex-nowrap">
                  <TextField 
                     value={item.punktet1}
                     //defaultValue={item.punktet1}
                     onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => onChangePunkte(event, item.rowKey, Punkte.t1, newValue)}
                     errorMessage={errorMessage}
                  />
                  &nbsp; : &nbsp;
                  <TextField 
                     value={item.punktet2}
                     onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => onChangePunkte(event, item.rowKey, Punkte.t2, newValue)}
                     errorMessage={errorMessage}
                  />
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
         minWidth: 40,
         maxWidth: 150,
         isRowHeader: true,
         isResizable: true,
         data: 'string',
      },
      {
         key: uuidv4(),
         name: 'Map2',
         fieldName: 'map2',
         minWidth: 40,
         maxWidth: 150,
         isRowHeader: true,
         isResizable: true,
         data: 'string',
      },
      {
         key: uuidv4(),
         name: 'Map3',
         fieldName: 'map3',
         minWidth: 40,
         maxWidth: 150,
         isRowHeader: true,
         isResizable: true,
         data: 'string',
      },
      {
         key: uuidv4(),
         name: 'Map4',
         fieldName: 'map4',
         minWidth: 40,
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
         
         {isAdmin &&
            <div className="mb-2 border border-fix border-danger rounded">
               <h4 className="p-2">Admin Ansicht</h4>
               <div className="p-2">
                  {getMessages(messages)}
               </div>

               <span className="p-2">Ergebnise ändern - Token eingeben - Save drücken</span>

               <Stack horizontal disableShrink tokens={itemAlignmentsStackTokens}>

    
                  {/* <PrimaryButton text={mode === Mode.Normal ? "Edit" : "Normal"} onClick={() => setMode(mode === Mode.Normal ? Mode.Edit : Mode.Normal)} /> */}
                  <Stack.Item align="end" grow={2} >
                     <TextField 
                           label="Token"
                           value={token}
                           onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => setToken(newValue ? newValue : "")}
                           
                     />
                  </Stack.Item>

               
                  <Stack.Item align="end" >
                     <PrimaryButton text="Save" onClick={() => saveChanges()} />
                  </Stack.Item>

               </Stack>
            </div>
         }
   
         <div style={{backgroundColor: "#282828"}}>
         <DetailsList
            items={gamesCompared}
            groups={groups}
            columns={isAdmin ? columnsEdit : columnsNormal }
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

function getMessages(messages: ISetGameResponse[]) {

   return messages.map((m: ISetGameResponse) => {
      var mType = MessageBarType.success;
      if(m.status !== "ok") {
         mType = MessageBarType.error;
      }
      return (
         <MessageBar
            className="p-1 mb-2"
            key={uuidv4()}
            messageBarType={mType}

            dismissButtonAriaLabel="Close"
         >
            {m.rowKey} - {m.message}
         </MessageBar>
      )
   })

}

export default Games;