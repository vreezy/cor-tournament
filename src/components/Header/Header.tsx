import React from 'react';
import useWindowSize from "../../utils/useWindowSize";
import IContent from '../../interfaces/IContent';
// import headerng from '../../header.jpg'

// styles
import './Header.scss';

// interfaces
type IHomeProps = {
   content: IContent,
}

function Header({content}: IHomeProps) {
   const { width } = useWindowSize();

   if(width > 993) {
      return (
         <div className="DesktopHeader">  
            <div className="container d-flex h-100 justify-content-center align-items-end flex-column">

               <div className="display-3 mb-0 text-right">
                  <p className="mb-0">{content.title}</p>
               </div>
               <div className="mb-0 text-right">
               <p> {content.subTitle}</p>
               </div>
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
