import React from 'react';
import { 
   DetailsList,
   DetailsListLayoutMode,
   //Selection,
   SelectionMode,
   IColumn,
} from '@fluentui/react/';

// helper
import { v4 as uuidv4 } from 'uuid';
import { Spinner, SpinnerSize  } from '@fluentui/react';

// services
import { getAzureTableEntities } from '../../services/AzureService';
import { compareTeams } from '../../services/CompareService';

// constantes
import { constants } from '../../constants';

// interfaces
import { IParticipant } from '../../interfaces/IParticipant';
import { ITeam } from '../../interfaces/ITeam';
import { IGame } from '../../interfaces/IGame';
import { IMap } from '../../interfaces/IMap';

import { ITeamCompared } from '../../interfaces/ITeamCompared';
// mock
// import { games as mockGames } from '../../mock/games';



function Teams() {
   const [loading, setLoading] = React.useState(false);
   const [teamsCompared, setTeamsCompared] = React.useState<ITeamCompared[]>([]);

   React.useEffect(() => {
      const fetchParticipants = async () => {
         setLoading(true);
         const promises: Promise<any>[] = [];
         promises.push(getAzureTableEntities(constants.azureAccount, "user"));
         promises.push(getAzureTableEntities(constants.azureAccount, "teams"));
         promises.push(getAzureTableEntities(constants.azureAccount, "games"));
         promises.push(getAzureTableEntities(constants.azureAccount, "maps"));
         const results = await Promise.all(promises);
         const participants: IParticipant[] = results[0];
         const teams: ITeam[] = results[1];
         const games: IGame[] = results[2]; // mockGames; // 
         const maps: IMap[] = results[3];

         const teamsCompared: ITeamCompared[] = compareTeams(teams, participants, games, maps);

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
            }
            else {
               team.rank = ++rank;
            }
            
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
         name: 'Platz',
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
         onRender: (item: ITeamCompared) => {
            return <span>{item.rank.toString()}.</span>            
         },
         data: 'number',
         //isPadded: true,
      },
      {
         key: uuidv4(),
         name: 'Name',
         fieldName: 'name',
         minWidth: 140,
         maxWidth: 180,
         isRowHeader: true,
         isResizable: true,
         isMultiline: true,
         // onRender: (item: ITeamCompared) => {
         //    const id: string = "t" + uuidv4().replaceAll('-', '');
         //    return (
         //       <div>
         //       <PrimaryButton id={id} >{item.name}</PrimaryButton>

         //       <TeachingBubble
         //          target={"#" + id}
         //          // primaryButtonProps={examplePrimaryButtonProps}
         //          // secondaryButtonProps={exampleSecondaryButtonProps}
         //          // onDismiss={toggleTeachingBubbleVisible}
         //          headline="Discover what’s trending around you"
         //       >
         //          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis aliquam magni
         //          harum non?
         //       </TeachingBubble>
         //     </div>
         //    )
         // },

         data: 'string'
      },
      {
      key: uuidv4(),
      name: 'Spieler',
      //fieldName: 'team1Name',
      minWidth: 180,
      // maxWidth: 120,
      isRowHeader: true,
      isResizable: true,
      isMultiline: true,
      onRender: (item: ITeamCompared) => {
         return (
            <div className="d-flex flex-wrap">
               {item.users.map((participant: any) => <div key={uuidv4()} className="badge badge-secondary block-badge font-weight-light p-2 m-1" style={{fontSize: "0.8rem"}}>{participant.user}</div> )}
            </div>
         )
      },
      data: 'string',
      // isPadded: true,
      },
      {
         key: uuidv4(),
         name: 'Punkte',
         fieldName: 'scores',
         minWidth: 50,
         maxWidth: 50,
         isRowHeader: true,
         className: "text-center",
         headerClassName: "headerCenterClass",
         data: 'string',
      },
      {
         key: uuidv4(),
         name: 'Wins',
         fieldName: 'wins',
         minWidth: 50,
         maxWidth: 50,
         isRowHeader: true,
         className: "text-center",
         headerClassName: "headerCenterClass",
         data: 'number',
      },
      {
         key: uuidv4(),
         name: 'Draws',
         fieldName: 'draws',
         minWidth: 50,
         maxWidth: 50,
         isRowHeader: true,
         className: "text-center",
         headerClassName: "headerCenterClass",
         data: 'number',

      },
      {
         key: uuidv4(),
         name: 'Looses',
         fieldName: 'looses',
         minWidth: 50,
         maxWidth: 50,
         isRowHeader: true,
         className: "text-center",
         headerClassName: "headerCenterClass",
         data: 'number',

      },
      {
         key: uuidv4(),
         name: 'Ergebnis',
         minWidth: 80,
         isRowHeader: true,
         className: "text-center",
         headerClassName: "headerCenterClass",
         onRender: (item: ITeamCompared) => {
            return (
               <span>
                  {item.pointsSelf} : {item.pointsEnemy}
               </span>
            )
         }
      },
      {
         key: uuidv4(),
         name: 'Maps',
         // fieldName: 'map2',
         minWidth: 140,
         maxWidth: 120,
         isRowHeader: true,
         onRender: (item: ITeamCompared) => {
            //return <div className="badge badge-primary font-weight-light p-2" style={{fontSize: "1.0rem"}}>{item.team1Name}</div>
            return (
               <div className="d-flex align-items-start flex-column">
                  <span>{item.map1}</span>
                  <span>{item.map2}</span>
               </div>
            )
         },
      }

   ];

   return (
      <div className="container mt-4">
         <div className="row">
            <div className="col">
               <h2>Tabelle</h2>
               {/* <h2>Teams ({teamsCompared.length})</h2> */}
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