import React from 'react';

// helper
import { v4 as uuidv4 } from 'uuid';
import { Spinner, SpinnerSize  } from '@fluentui/react';

// interfaces
import { IParticipant } from '../../interfaces/IParticipant';

// globalState
import { globalStateContext } from '../../App';

function Participants() {
   const { loading, participants } = React.useContext(globalStateContext);

   return (
      <div className="container mt-4">
         <div className="row">
            <div className="col">
               <h2>Teilnehmer ({participants.length})</h2>
            </div>
         </div>
         
         <div className="row m-1 p-4 align-items-center justify-content-center border border-fix border-secondary rounded ">
            {loading && <div className="col col-auto p-5"><Spinner label="Loading..." size={SpinnerSize.large}/> </div> }
            {participants.map((participant: IParticipant) => <div key={uuidv4()} className="col col-auto p-2"><div className="badge badge-secondary font-weight-light p-2" style={{fontSize: "1.2rem"}}>{participant.user}</div></div> )}
         </div>                  
      </div>         
   );
}

export default Participants;