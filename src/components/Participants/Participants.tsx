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
export type IParticipantsProps = {
   participants: IParticipant[];
   setParticipants(participants: IParticipant[]): void;
}

function Participants({participants, setParticipants}: IParticipantsProps) {
   const [loading, setLoading] = React.useState(false);

   React.useEffect(() => {
      const fetchParticipants = async () => {
         setLoading(true);
         const response: IParticipant[] = await getAzureTableEntities(constants.azureAccount, "user");
         setParticipants(response);
         setLoading(false);
      }
      fetchParticipants();
   
      return () => {
      // returned function will be called on component unmount    
      }
   }, [setParticipants]);

   return (
      <div className="container mt-4">
         <div className="row">
            <div className="col">
               <h2>Teilnehmer ({participants.length})</h2>
            </div>
         </div>
         
         <div className="row m-1 p-4 align-items-center justify-content-center border border-fix border-secondary rounded ">
            {loading && <div className="col col-auto p-5"><Spinner label="Loading..." size={SpinnerSize.large}/> </div> }
            {participants.map((participant: any) => <div key={uuidv4()} className="col col-auto p-2"><div className="badge badge-secondary font-weight-light p-2" style={{fontSize: "1.2rem"}}>{participant.user}</div></div> )}
         </div>                  
      </div>         
   );
}

export default Participants;