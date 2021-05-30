import React from 'react';

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

interface ITeamCompared extends ITeam {
   users: IParticipant[];
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
         const results = await Promise.all(promises);
         const participants: IParticipant[] = results[0];
         const teams: ITeam[] = results[1];

         const teamsCompared: ITeamCompared[] = teams.map((team: ITeam) => {
            const users = participants.filter(p => p.teamRowKey === team.rowKey);
            return {
               etag: team.etag,
               map1: team.map1,
               map2: team.map2,
               name: team.name,
               partitionKey: team.partitionKey,
               rowKey: team.rowKey,
               timestamp: team.timestamp,
               users
            }

         });

         setTeamsCompared(teamsCompared);


         setLoading(false);
      }
      fetchParticipants();
   
      return () => {
      // returned function will be called on component unmount    
      }
   }, [setTeamsCompared]);

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

         {teamsCompared.map((team: ITeamCompared) => {
               return (
                  <div key={uuidv4()} className="row m-1 p-4 align-items-center border border-fix border-secondary rounded ">
                     <div className="col col-auto p-2">
                        <div className="badge badge-primary block-badge font-weight-light p-2" style={{fontSize: "1.8rem"}}>{team.name}</div>
                        <br />
                     {/* Spieler: */}

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
            })}
      </div>         
   );
}

// function Team() {
//    return (

//    )

// }

export default Teams;