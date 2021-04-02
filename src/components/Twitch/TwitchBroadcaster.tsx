import React from 'react';

// logging
// import { reactPlugin } from '../../utils/AppInsights';
import { 
   useAppInsightsContext,
   useTrackEvent,
   //withAITracking
} from "@microsoft/applicationinsights-react-js";

// styles
import './TwitchBroadcaster.scss'

// interfaces
import { ITwitchBroadcaster } from '../../interfaces/ITwitchBroadcaster';
type ITwitchBroadcasterProps = {
   data: ITwitchBroadcaster
}

function TwitchBroadcaster({ data }: ITwitchBroadcasterProps) {
   const appInsights = useAppInsightsContext();
   const trackBroadcaster = useTrackEvent(appInsights, "TwitchItem - Broadcaster clicked", {broadcaster_login: ""}, false);

   // TODO track dosent run well us js to open twitch link
   // window.open(url, '_blank').focus();

   const stringToBool = (str: string): boolean => {
      return str.toLowerCase() === "true"
   }

   const isLive = (state: string) => {
      if(stringToBool(state)) {
         return 'twitchOnline'
      }
      return 'twitchOffline'
   }

   const liveBadge = (state: string) =>{
      if(stringToBool(state)) {
         return <span className="badge badge-danger">Online</span>
      }
      return <span className="badge badge-secondary">Offline</span>
   }
      
   return (
      <div className="col col-lg-4 col-xl-4 p-3 flex-fill">
         <a href={"https://twitch.tv/" + data.broadcaster_login} target="_blank" rel="noreferrer" onClick={() => trackBroadcaster({broadcaster_login: data.broadcaster_login})}>
            <div className={"twitchBoradcasterInner border-fix d-flex flex-column border border-2 h-100 rounded " + isLive(data.is_live)} style={{backgroundImage: "url("+data.thumbnail_url+")"}}>
               <div className="twitchBroadcasterText mb-auto p-2 d-flex justify-content-between">
                  <div className="font-weight-bold">{data.display_name}</div>
                  <div>{liveBadge(data.is_live)}</div>
               </div>
               <div className="twitchBroadcasterText p-2">
                  {data.title}
               </div>
            </div>
         </a>
      </div>
   )
}

export default TwitchBroadcaster; // withAITracking(reactPlugin, TwitchItem);