import React from 'react';
import {
   Link
} from "react-router-dom";

// styles
import './Footer.scss';

function Footer() {
   return (
      <div className="Footer">
         <div className="container">
            <div className="d-flex flex-column align-self-stretch">
               <div className="flex-fill"><Link to="/">Start</Link></div>
               <div className="flex-fill"><Link to="/impressum">Impressum</Link></div>
               <div className="flex-fill"><Link to="/dataprotection">Datenschutz</Link></div>
               <div className="flex-fill"><Link to="/contact">Kontakt</Link></div>
               <div className="flex-fill"><a href="https://www.cryofredemption.de/" target="_blank" rel="noreferrer">Cry of Redemption</a></div>
            </div>
         </div>
      </div>
   );
}

export default Footer;
