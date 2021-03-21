import React from 'react';
import useWindowSize from "../../utils/useWindowSize";
import IContent from '../../interfaces/IContent';

// interfaces
type IHomeProps = {
   content: IContent,
}

function Header({content}: IHomeProps) {
   const { width } = useWindowSize();

   if(width > 500) {
      return (
         <div>  
            <div className="container">
               <h1> Desktop - {content.title} </h1>
               {content.subTitle}
            </div>
         </div>         
      );
   }

   return (
      <div>
         <div className="container">
            <h1> mobile - {content.title} </h1>
            {content.subTitle}
         </div>
      </div>
   )
}

export default Header;
