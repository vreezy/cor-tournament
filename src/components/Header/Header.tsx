import React from 'react';
import useWindowSize from "../../utils/useWindowSize";
import IContent from '../../interfaces/IContent';
// import headerng from '../../header.jpg'

import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';
// styles
import './Header.scss';

// interfaces
type IHeaderProps = {
   content: IContent,
}

function Header({content}: IHeaderProps) {
   const { width } = useWindowSize();

   if(width < 994) {
      return (
        <MobileHeader content={content}/>
      );
   }

   return (
     <DesktopHeader content={content} />
   );
}

export default Header;