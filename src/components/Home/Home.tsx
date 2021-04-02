import React from 'react';

import logo from '../../logo_300.png';

import Overview from '../Overview/Overview'
import Participants from '../Participants/Participants';
import Twitch from '../Twitch/Twitch';



// helper
//import { v4 as uuidv4 } from 'uuid';

// styles
import './Home.scss';

// interfaces
import IContent from '../../interfaces/IContent';

// import useWindowScrollTop from '../../utils/useWindowScrollTop';

import { IParticipant } from '../../interfaces/IParticipant';

type IHomeProps = {
   content: IContent,
}

function Home({content}: IHomeProps) {
   // useWindowScrollTop();

   const [participants, setParticipants] = React.useState<IParticipant[]>([]);

   const addParticipant = (username: string) => {
      const participantsClone: IParticipant[] = JSON.parse(JSON.stringify(participants));
      participantsClone.push({
         etag: "",
         partitionKey: "",
         rowKey: "",
         timestamp: "",
         user: username
      });

      setParticipants(participantsClone);
   }
   
   return (
      <div>
         <Overview addParticipant={addParticipant} participants={participants} />
         <Participants participants={participants} setParticipants={setParticipants}/>
         <Twitch />

         <div className="container mt-5 mb-5 text-center">
            Presented by<br />
            <img src={logo} alt="Logo"/>
         </div>
      </div>      
   );
}

export default Home;
