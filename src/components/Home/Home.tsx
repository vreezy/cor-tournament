import React from 'react';
import logo from '../../logo_300.png';

import OverviewCard from '../OverviewCard/OverviewCard';
import IContent from '../../interfaces/IContent';

import Register from '../Register/Register';
import Rules from '../Rules/Rules';

import User from '../User/User';

import { v4 as uuidv4 } from 'uuid';

// styles
import './Home.scss';

// interfaces
type IHomeProps = {
   content: IContent,
}

function Home({content}: IHomeProps) {


      return (
         <div className="container">
            <div className="row">
               <OverviewCard title="Übersicht" content={content.overview.map((ele) => <div key={uuidv4()}>{ele} <br /></div> )}   />
               <OverviewCard title="Anmelden" content={<Register />}/>
               <OverviewCard title="Regeln" content={<Rules content={content.rules}/>}/>
            </div>

         
            <User />
           

            <div className="">
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
