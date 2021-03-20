import React from 'react';
import useWindowSize from "../../utils/useWindowSize";


function Header() {
   const { width } = useWindowSize();

   if(width > 500) {
      return (
         <div>  
            Desktop
         </div>         
      );
   }

   return (
      <div>
         mobile
      </div>
   )
}

export default Header;
