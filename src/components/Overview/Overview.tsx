import React from 'react';

// components
import OverviewCard from '../OverviewCard/OverviewCard';
import Register from '../Register/Register';
import Rules from '../Rules/Rules';
import OverViewContent from './OverviewContent';

// helper
// import { v4 as uuidv4 } from 'uuid';
// content
import content from '../../content';

import { IParticipant } from '../../interfaces/IParticipant';

type IOverviewProps = {
   addParticipant(username: string): void;
   participants: IParticipant[];
}

function Overview({addParticipant,  participants}: IOverviewProps) {
   return (
      <div className="container mt-4">
         <div className="row">
            <OverviewCard title="Übersicht" content={<OverViewContent />}   />
            <OverviewCard title="Anmelden" content={<Register addParticipant={addParticipant} participantsCount={participants.length}/>}/>
            <OverviewCard title="Regeln" content={<Rules />}/>
         </div>
      </div>
   );
}

export default Overview;
