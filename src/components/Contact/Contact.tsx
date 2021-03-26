import React from 'react';

import useWindowScrollTop from '../../utils/useWindowScrollTop';

function Contact() {
   useWindowScrollTop();

   return (
      <div className="container">
         <h1>Kontakt</h1>

         Teamspeak: <a href="ts3server://94.250.223.13:15069">94.250.223.13:15069</a> <br />
         <br />
         Discord: <a href="https://discord.gg/GamPV9CEXy">https://discord.gg/GamPV9CEXy</a>

      </div>      
   );
}

export default Contact;
