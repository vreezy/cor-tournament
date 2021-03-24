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

function Overview() {


   return (
      <div>
         <br /><br />
         <div className="container">
            <div className="row">
               <OverviewCard title="Übersicht" content={<OverViewContent />}   />
               <OverviewCard title="Anmelden" content={<Register />}/>
               <OverviewCard title="Regeln" content={<Rules content={content.rules}/>}/>
            </div>
         </div>


      </div>
      
   );
}

export default Overview;
