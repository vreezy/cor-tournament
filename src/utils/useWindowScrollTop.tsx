import React from "react";

export default function useWindowScrolltop() {
   React.useEffect(() => {
      const scrollTop = () =>{
         window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
         });
      }
      scrollTop();
   });
}