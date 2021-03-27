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

type IOverviewProps = {
   addParticipant(username: string): void;
}

function Overview({addParticipant}: IOverviewProps) {
   return (
      <div className="container mt-4">
         <div className="row">
            <OverviewCard title="Übersicht" content={<OverViewContent />}   />
            <OverviewCard title="Anmelden" content={<Register addParticipant={addParticipant}/>}/>
            <OverviewCard title="Regeln" content={<Rules content={content.rules}/>}/>
         </div>
      </div>
   );
}

export default Overview;
