import React from 'react';
import { 
   DetailsList,
   DetailsListLayoutMode,
   //Selection,
   SelectionMode,
   IColumn
} from '@fluentui/react/lib/DetailsList';

// helper
import { v4 as uuidv4 } from 'uuid';
import { Spinner, SpinnerSize  } from '@fluentui/react';

// services
import { getAzureTableEntities } from '../../services/AzureService';

// constantes
import { constants } from '../../constants';

// interfaces
import { IParticipant } from '../../interfaces/IParticipant';
import { ITeam } from '../../interfaces/ITeam';
import { IGame } from '../../interfaces/IGame';

interface ITeamCompared extends ITeam {
   users: IParticipant[];
   scores: number;
   rank: number;
}

function Teams() {
   const [loading, setLoading] = React.useState(false);


   // const [participants, setParticipants] = React.useState<IParticipant[]>([]);
   // const [teams, setTeams] = React.useState<ITeam[]>([]);

   const [teamsCompared, setTeamsCompared] = React.useState<ITeamCompared[]>([]);

   React.useEffect(() => {
      const fetchParticipants = async () => {
         setLoading(true);
         const promises: Promise<any>[] = [];
         promises.push(getAzureTableEntities(constants.azureAccount, "user"));
         promises.push(getAzureTableEntities(constants.azureAccount, "teams"));
         promises.push(getAzureTableEntities(constants.azureAccount, "games"));
         const results = await Promise.all(promises);
         const participants: IParticipant[] = results[0];
         const teams: ITeam[] = results[1];
         const games: IGame[] = results[2];

         const teamsCompared: ITeamCompared[] = teams.map((team: ITeam) => {
            const users = participants.filter(p => p.teamRowKey === team.rowKey);
            var scores: number = 0
            games.forEach((game: IGame) => {
               if(game.team1RowKey === team.rowKey) {
                  if(!isNaN(parseInt(game.punktet1)))
                  scores += parseInt(game.punktet1);
               }

               if(game.team2RowKey === team.rowKey) {
                  if(!isNaN(parseInt(game.punktet2)))
                  scores += parseInt(game.punktet2);
               }
            })
            return {
               etag: team.etag,
               map1: team.map1,
               map2: team.map2,
               name: team.name,
               partitionKey: team.partitionKey,
               rowKey: team.rowKey,
               timestamp: team.timestamp,
               users,
               scores,
               rank: 0
            }

         });

         const teamsComparedSorted: ITeamCompared[] = teamsCompared.sort((a: ITeamCompared, b: ITeamCompared) => {
            return a.scores - b.scores;
         });

         const teamsComparedRanked: ITeamCompared[] = teamsComparedSorted.map((team: ITeamCompared, index: number) => {
            team.rank = index + 1;
            return team;
         });

         setTeamsCompared(teamsComparedRanked);


         setLoading(false);
      }
      fetchParticipants();
   
      return () => {
      // returned function will be called on component unmount    
      }
   }, [setTeamsCompared]);

   const columns: IColumn[] = [
      {
         key: uuidv4(),
         name: '#',
         fieldName: 'rank',
         minWidth: 30,
         maxWidth: 40,
         isRowHeader: true,
         isResizable: false,
         // isSorted: true,
         // isSortedDescending: false,
         // sortAscendingAriaLabel: 'Sorted A to Z',
         // sortDescendingAriaLabel: 'Sorted Z to A',
         //onColumnClick: this._onColumnClick,
         // onRender: (item: IGameCompared) => {
         //    return <span>{new Date(item.gameDateTime.value).toLocaleDateString()}</span>

            
         // },
         data: 'number',
         //isPadded: true,
       },
       {
         key: uuidv4(),
         name: 'Name',
         fieldName: 'name',
         minWidth: 100,
         maxWidth: 100,
         isRowHeader: true,
         isResizable: true,
         //isSorted: true,
         //isSortedDescending: false,
         //sortAscendingAriaLabel: 'Sorted A to Z',
         //sortDescendingAriaLabel: 'Sorted Z to A',
         //onColumnClick: this._onColumnClick,
         // onRender: (item: IGameCompared) => {
         //    return <span>{new Date(item.gameDateTime.value).toLocaleTimeString()}</span>
            
         // },
         // data: 'string',
         //isPadded: true,
       },
       {
        key: uuidv4(),
        name: 'Spieler',
        //fieldName: 'team1Name',
        minWidth: 300,
        maxWidth: 500,
        isRowHeader: true,
        isResizable: true,
      //   isSorted: true,
      //   isSortedDescending: false,
      //   sortAscendingAriaLabel: 'Sorted A to Z',
      //   sortDescendingAriaLabel: 'Sorted Z to A',
        //onColumnClick: this._onColumnClick,
        onRender: (item: ITeamCompared) => {
         //return <div className="badge badge-primary font-weight-light p-2" style={{fontSize: "1.0rem"}}>{item.team1Name}</div>
         return item.users.map((participant: any) => <div key={uuidv4()} className="badge badge-secondary block-badge font-weight-light p-2 mr-2" style={{fontSize: "0.8rem"}}>{participant.user}</div> )
      },
        data: 'string',
        isPadded: true,
      },
      {
         key: uuidv4(),
         name: 'Punkte',
         fieldName: 'scores',
         minWidth: 100,
         maxWidth: 120,
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
         name: 'Map1',
         fieldName: 'map1',
         minWidth: 100,
         maxWidth: 120,
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
         name: 'Map2',
         fieldName: 'map2',
         minWidth: 100,
         maxWidth: 120,
         isRowHeader: true,
         //isResizable: true,
         //isSorted: true,
         //isSortedDescending: false,
         //sortAscendingAriaLabel: 'Sorted A to Z',
         //sortDescendingAriaLabel: 'Sorted Z to A',
         //onColumnClick: this._onColumnClick,
         data: 'string',
         //isPadded: true,
       }

    ];

   return (
      <div className="container mt-4">
         <div className="row">
            <div className="col">
               <h2>Teams ({teamsCompared.length})</h2>
            </div>
         </div>
         
         {loading && 
            <div className="row m-1 p-4 align-items-center justify-content-center border border-fix border-secondary rounded ">
               <div className="col col-auto p-5"><Spinner label="Loading..." size={SpinnerSize.large}/></div>
            </div> 
         }

         <DetailsList
            items={teamsCompared}
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

         {/* {teamsCompared.map((team: ITeamCompared) => {
               return (
                  <div key={uuidv4()} className="row m-1 p-4 align-items-center border border-fix border-secondary rounded ">
                     <div className="col col-auto p-2">
                        <div className="badge badge-primary block-badge font-weight-light p-2" style={{fontSize: "1.8rem"}}>{team.name}</div>
                        <br />
                     

                     <div className="mt-2">
                        {team.users.map((participant: any) => <div key={uuidv4()} className="badge badge-secondary block-badge font-weight-light p-2 mr-2" style={{fontSize: "1.2rem"}}>{participant.user}</div> )}
                     </div>

                     <div className="mt-2">
                        <div key={uuidv4()} className="badge badge-secondary font-weight-light p-2 mr-2" style={{fontSize: "1.0rem"}}>{team.map1}</div>
                        <div key={uuidv4()} className="badge badge-secondary font-weight-light p-2 mr-2" style={{fontSize: "1.0rem"}}>{team.map2}</div>
                     </div>
               
                     </div> 
                  </div> 
               )
            })} */}
      </div>         
   );
}

// function Team() {
//    return (

//    )

// }

export default Teams;