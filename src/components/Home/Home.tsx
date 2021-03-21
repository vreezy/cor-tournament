import React from 'react';
import logo from '../../logo_300.png';

import OverviewCard from '../OverviewCard/OverviewCard';
import IContent from '../../interfaces/IContent';

import Register from '../Register/Register';
import Rules from '../Rules/Rules';

// styles
import './Home.scss';

// interfaces
type IHomeProps = {
   content: IContent,
}

function Home({content}: IHomeProps) {


      return (
         <div className="container">
       


            <img src={logo} alt="Logo"/>
            <br />
 


            <div className="InfoBox d-flex flex-wrap align-items-stretch">
               <OverviewCard title="Übersicht" content={content.overview.map(ele => <div>{ele} <br /></div> )}   />
               <OverviewCard title="Anmelden" content={<Register />}/>
               <OverviewCard title="Regeln" content={<Rules content={content.rules}/>}/>
            </div>

            <div className="d-flex">

               
               Teilnehmer auflistung<br />

               Teams auflistung<br />

               twitch links/live<br />

               

               Turnier plan https://display.turnier.live/R1se/cor-test/0<br />
               +
            </div>
     
         </div>
         
      );

}

export default Home;
