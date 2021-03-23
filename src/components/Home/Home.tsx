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

            <br /><br />
            <div className="container">
            <br />
               
               <h2>TODO</h2>
               Teilnehmer refresh nach registrierung<br />
               Teilnehmer a-z / z-a
               <br />
               header background image
               <br />
               Teams auflistung<br />
               <br />
               twitch links/live<br />
               <br />
               Turnier plan https://display.turnier.live/R1se/cor-test/0<br />

               <br />
               <img src={logo} alt="Logo"/>
               
            </div>
     
         </div>

         
      );

}

export default Home;
