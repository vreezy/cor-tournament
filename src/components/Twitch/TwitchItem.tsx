import React from 'react';
import { ITwitchItem } from '../../interfaces/ITwitchItem';
// styles
import './TwitchItem.scss'

type ITwitchItemProps = {
   data: ITwitchItem
}

function TwitchItem({ data }: ITwitchItemProps) {

   const isLive = (state: boolean) => {
      if(state) {
         return 'online'
      }
      return 'offline'
   }

   return (
      <div className="col col-lg-4 col-xl-4 flex-fill" >
         <div className={"TwitchItem border-fix text-center border border-2 h-100 rounded " + isLive(data.is_live)} style={{backgroundImage: "url("+data.thumbnail_url+")"}}>
         {/* <img src={data.thumbnail_url} alt="thumb"/> */}
         {/* d-flex flex-column */}
         {data.display_name}
         {data.is_live}
         {data.title}
         </div>
      </div>
   )

}

export default TwitchItem