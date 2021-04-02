import React from 'react';

import IContent from '../../interfaces/IContent';

// interfaces
type IHeaderProps = {
   content: IContent,
}

function DesktopHeader({content}: IHeaderProps) {
  return (
   <div>
      <div className="desktopHeader">
         <div className="dividerHeader">
            <div className="container d-flex h-100 justify-content-center align-items-end flex-column ">

               <div className="desktopHeaderText display-3 mb-0 text-right">
                  <p className="mb-0">{content.title}</p>
               </div>
               <div className="desktopHeaderText mb-0 text-right">
                  <p> {content.subTitle}</p>
               </div>
            </div>
         </div>
      </div>   
   </div>
   
  );
}

export default DesktopHeader;
