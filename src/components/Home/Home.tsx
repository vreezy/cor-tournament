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

type IHomeProps = {
   content: IContent,
}

function Home({content}: IHomeProps) {


      return (
         <div>
            <Overview />
            <Participants />
            <Twitch />


            <div className="container mt-5 mb-5 text-center">
               Presented by<br />
               <img src={logo} alt="Logo"/>
            </div>



     
         </div>

         
      );

}



export default Home;
