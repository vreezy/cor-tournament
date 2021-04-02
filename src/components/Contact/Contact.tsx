import React from 'react';

//logging
import { reactPlugin } from '../../utils/AppInsights';
import { 
   withAITracking
} from "@microsoft/applicationinsights-react-js";


// util
import useWindowScrollTop from '../../utils/useWindowScrollTop';

function Contact() {
   useWindowScrollTop();

   return (
      <div className="container">
         <h1>Kontakt</h1>

         <p>
            Teamspeak: <a href="ts3server://94.250.223.13:15069">94.250.223.13:15069</a> <br />
            Discord: <a href="https://discord.gg/GamPV9CEXy">https://discord.gg/GamPV9CEXy</a>
         </p>

      </div>      
   );
}

export default withAITracking(reactPlugin, Contact);
