import React from 'react';

// components
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

// styles
import './Header.scss';

// util
import useWindowSize from "../../utils/useWindowSize";

// interfaces
import IContent from '../../interfaces/IContent';
export type IHeaderProps = {
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