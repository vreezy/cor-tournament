import React from 'react';
import {
   Link
} from "react-router-dom";
import Twitch from '../Twitch/Twitch';
import logo from '../../logo_300.png';

// styles
import './Footer.scss';

import { globalStateContext } from '../../App';

function Footer() {
   const { isAdmin, setAdmin } = React.useContext(globalStateContext);

   const toggleAdmin = () => {
      setAdmin(!isAdmin);
     
   }

   return (
      <div>
      <Twitch />

      <div className="container mt-5 mb-5 text-center">
         Presented by<br />
         <img src={logo} alt="Logo"/>
      </div>

      <div className="Footer">
         <div className="container">
            <div className="d-flex flex-column align-self-stretch">
               <div className="flex-fill"><Link to="/">Start</Link></div>
               <div className="flex-fill"><Link to="/impressum">Impressum</Link></div>
               <div className="flex-fill"><Link to="/dataprotection">Datenschutz</Link></div>
               <div className="flex-fill"><Link to="/contact">Kontakt</Link></div>
               <div className="flex-fill"><a href="javascript:;" role="button" onClick={() => toggleAdmin()}>{isAdmin ? "Normal" : "Admin"} </a></div>
               <div className="flex-fill"><a href="https://www.cryofredemption.de/" target="_blank" rel="noreferrer">Cry of Redemption</a></div>
            </div>
         </div>
      </div>
      </div>
   );
}

export default Footer;
