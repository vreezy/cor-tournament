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
   IStackTokens,
   Dropdown,
   IDropdownOption
} from '@fluentui/react';


import { globalStateContext } from '../../App';

export interface IGameCompared extends IGame {
   team1Name: string;
   team2Name: string;
   map1RowKey: string;
   map2RowKey: string;
   map3RowKey: string;
   map4RowKey: string;
   isMap3Random: boolean;
   isMap4Random: boolean;
   map3Team2RowKey: string;
   map4Team2RowKey: string;
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
   const [maps, setMaps] = React.useState<IMap[]>([]);
   const [mapsDDoptions, setMapsDDoptions] = React.useState<IDropdownOption[]>([]);
   
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

         const gamesFiltered = games.sort((a: IGame, b: IGame) => {
            return new Date(a.gameDateTime.value).getTime() - new Date(b.gameDateTime.value).getTime();
         });

         const gamesCompared: IGameCompared[] = gamesFiltered.map((game: IGame) => {
            const team1: ITeam | FakeTeam = teams.find(t => t.rowKey === game.team1RowKey) || new FakeTeam();
            const team2: ITeam | FakeTeam = teams.find(t => t.rowKey === game.team2RowKey) || new FakeTeam();

            const team1Maps = [team1.map1, team1.map2];

            var map3RowKey = "";
            var map4RowKey = "";
            var isMap3Random = false;
            var isMap4Random = false;

            var map3Team2RowKey = "";
            var map4Team2RowKey = "";
            
            if(team1Maps.includes(team2.map1)){
               map3RowKey = game.map3RowKey ? game.map3RowKey : "Fehler";
               isMap3Random = true;
               map3Team2RowKey = team2.map1;
            }
            else {
               map3RowKey = team2.map1;
            }

            if(team1Maps.includes(team2.map2)){
               map4RowKey = game.map4RowKey ? game.map4RowKey : "Fehler";
               isMap4Random = true;
               map4Team2RowKey = team2.map2;
            }
            else {
               map4RowKey = team2.map2;
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
               map1RowKey: team1.map1,
               map2RowKey: team1.map2,
               map3RowKey,
               map3Team2RowKey,
               isMap3Random,
               map4RowKey,
               map4Team2RowKey,
               isMap4Random
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

         const mapsDDoptions: IDropdownOption[] = maps.map((m: IMap) => {
            return ({
               key: m.rowKey,
               text: m.name
            })
         })

         setGroups(groups)
         setGamesCompared(gamesCompared);
         setGames(games);
         setMaps(maps);
         setMapsDDoptions(mapsDDoptions)
         setLoading(false);
      }
      initFetch();
   
      return () => {
      // returned function will be called on component unmount    
      }
   }, [setGamesCompared, setGroups, setLoading]);

   const saveChanges = async () => {
      setMessages([]);
      const gamesToChange = gamesCompared.filter((gc: IGameCompared, ) => {
         const gameIndex = games.findIndex((g: IGame) => g.rowKey === gc.rowKey);

         if(games[gameIndex]?.punktet1 !== gc.punktet1) {
            return true;
         }

         if(games[gameIndex]?.punktet2 !== gc.punktet2) {
            return true;
         }

         if(games[gameIndex]?.map3RowKey !== gc.map3RowKey && gc.isMap3Random) {
            return true;
         }

         if(games[gameIndex]?.map4RowKey !== gc.map4RowKey && gc.isMap4Random) {
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
            map3RowKey: gtc.map3RowKey,
            map4RowKey: gtc.map4RowKey
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
      // console.log(results)

      // update games
      const newGames: IGame[] = await getAzureTableEntities(constants.azureAccount, "games");
      setGames(newGames);      
      setMessages(results);
   }
      
   const onChangePunkte = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, rowKey: string, pEnum: Punkte, newValue?: string | undefined ) => {
      // console.log(event)
      // event.preventDefault();

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

   
   const onChangeMapDD = (rowKey: string, mapKey: 3|4, option?: IDropdownOption<any> | undefined) => {
      // console.log(option)

      if(option) {
         const gcClone: IGameCompared[] = JSON.parse(JSON.stringify(gamesCompared))
         const index = gcClone.findIndex((gc: IGameCompared) => gc.rowKey === rowKey)

         if(mapKey === 3) {
            gcClone[index].map3RowKey = option.key.toString()
         }

         if(mapKey === 4) {
            gcClone[index].map4RowKey = option.key.toString()
         }

         setGamesCompared(gcClone);
      }
   }


   const columnsNormal: IColumn[] = [
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
                  {item.punktet1}&nbsp;:&nbsp;{item.punktet2}
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
         onRender: (item: IGameCompared) => {
            return (
               <span>
                  {maps.find((m: IMap) => {return m.rowKey === item.map1RowKey})?.name || "Render Fehler"}
               </span>
            );
         } 
      },
      {
         key: uuidv4(),
         name: 'Map2',
         fieldName: 'map2',
         minWidth: 100,
         maxWidth: 150,
         isRowHeader: true,
         isResizable: true,
         onRender: (item: IGameCompared) => {
            return (
               <span>
                  {maps.find((m: IMap) => {return m.rowKey === item.map2RowKey})?.name || "Render Fehler"}
               </span>
            );
         } 
      },
      {
         key: uuidv4(),
         name: 'Map3',
         fieldName: 'map3',
         minWidth: 100,
         maxWidth: 150,
         isRowHeader: true,
         isResizable: true,
         onRender: (item: IGameCompared) => {
            return (
               <span className={item.isMap3Random ? "text-primary" : ""}>
                  {maps.find((m: IMap) => {return m.rowKey === item.map3RowKey})?.name || "Render Fehler"}
               </span>
            );
         } 
         // data: 'string',
      },
      {
         key: uuidv4(),
         name: 'Map4',
         // fieldName: 'map4',
         minWidth: 100,
         maxWidth: 150,
         isRowHeader: true,
         isResizable: true,
         onRender: (item: IGameCompared) => {
            return (
               <span className={item.isMap4Random ? "text-primary" : ""}>
                  {maps.find((m: IMap) => {return m.rowKey === item.map4RowKey})?.name || "Render Fehler"}
               </span>
            );
         }         
      },
   ];


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
         minWidth: 240,
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
         minWidth: 180,
         maxWidth: 180,
         isRowHeader: true,
         isResizable: true,
         onRender: (item: IGameCompared) => {
            return (
               <span>
                  {maps.find((m: IMap) => {return m.rowKey === item.map1RowKey})?.name || "Render Fehler"}
               </span>
            );
         } 
      },
      {
         key: uuidv4(),
         name: 'Map2',
         fieldName: 'map2',
         minWidth: 180,
         maxWidth: 180,
         isRowHeader: true,
         isResizable: true,
         onRender: (item: IGameCompared) => {
            return (
               <span>
                  {maps.find((m: IMap) => {return m.rowKey === item.map2RowKey})?.name || "Render Fehler"}
               </span>
            );
         }  
      },
      {
         key: uuidv4(),
         name: 'Map3',
         fieldName: 'map3',
         minWidth: 180,
         maxWidth: 180,
         isRowHeader: true,
         isResizable: true,
         onRender: (item: IGameCompared) => {
            if(item.isMap3Random) {
               return (
                  <div>
                     <Dropdown
                        // label="Controlled example"
                        selectedKey={item.map3RowKey}
                        onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption<any> | undefined, index?: number | undefined) => onChangeMapDD(item.rowKey, 3, option)}
                        placeholder="Bitte Karte wählen"
                        options={mapsDDoptions.filter((m: IDropdownOption) => m.key !== item.map3Team2RowKey && m.key !== item.map4Team2RowKey)}
                     />
                     <span className="text-danger">
                        {maps.find((m: IMap) => {return m.rowKey === item.map3Team2RowKey})?.name || "Render Fehler"}
                     </span>                  
                  </div>
               );
            }

            return (
               <span>
                  {maps.find((m: IMap) => {return m.rowKey === item.map3RowKey})?.name || "Render Fehler"}
               </span>
            );
         } 
      },
      {
         key: uuidv4(),
         name: 'Map4',
         fieldName: 'map4',
         minWidth: 180,
         maxWidth: 180,
         isRowHeader: true,
         isResizable: true,
         onRender: (item: IGameCompared) => {
            if(item.isMap4Random) {
               return (
                  <div>
                     <Dropdown
                        // label="Controlled example"
                        selectedKey={item.map4RowKey}
                        onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption<any> | undefined, index?: number | undefined) => onChangeMapDD(item.rowKey, 4, option)}
                        placeholder="Bitte Karte wählen"
                        options={mapsDDoptions.filter((m: IDropdownOption) => m.key !== item.map3Team2RowKey && m.key !== item.map4Team2RowKey)}
                     />
                     <span className="text-danger">
                        {maps.find((m: IMap) => {return m.rowKey === item.map4Team2RowKey})?.name || "Render Fehler"}
                     </span>
                  </div>
               );
            }

            return (
               <span>
                  {maps.find((m: IMap) => {return m.rowKey === item.map4RowKey})?.name || "Render Fehler"}
               </span>
            );
         },
         isPadded: true
      },
   ];


   return (
      <div className={isAdmin ? "m-5" : "container mt-4"}>
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