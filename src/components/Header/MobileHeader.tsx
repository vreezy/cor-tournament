import React from 'react';
import IContent from '../../interfaces/IContent';

// interfaces
type IHeaderProps = {
   content: IContent,
}

function Header({content}: IHeaderProps) {
  return (
      <div className="container">
         <br /><br />
         <h1>{content.title} </h1>
         {content.subTitle}
      </div>
  );
}

export default Header;
