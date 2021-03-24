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

   const liveBadge = (state: boolean) =>{
      if(state) {
         return <span className="badge badge-danger">Online</span>
      }
      return <span className="badge badge-secondary">Offline</span>
   }
      
   return (
      <div className="TwitchItem p-3 col col-lg-4 col-xl-4 flex-fill">
         <a href={"https://twitch.tv/" + data.broadcaster_login} target="_blank" rel="noreferrer">
            <div className={"TwitchItemInner border-fix d-flex flex-column  border border-2 h-100 rounded " + isLive(data.is_live)} style={{backgroundImage: "url("+data.thumbnail_url+")"}}>
               <div className="TwitchItemText mb-auto p-2 d-flex justify-content-between">
                  <div className="font-weight-bold">{data.display_name}</div>
                  <div>{liveBadge(data.is_live)}</div>
               </div>
               <div className="TwitchItemText p-2">
                  {data.title}
               </div>
            </div>
         </a>
      </div>
   )
}

export default TwitchItem