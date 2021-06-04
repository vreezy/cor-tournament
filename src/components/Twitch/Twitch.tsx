import React from 'react';

import { constants } from '../../constants';

// logging
import { reactPlugin } from '../../utils/AppInsights';
// import { 
//    useAppInsightsContext,
//    useTrackMetric,
//    useTrackEvent,
//    withAITracking
// } from "@microsoft/applicationinsights-react-js";

// components
import TwitchItem from './TwitchBroadcaster';

// services
import { getAzureTableEntities } from '../../services/AzureService';
import { setKey, getKey } from '../../services/cacheService';

// helper
import { v4 as uuidv4 } from 'uuid';
import { Spinner, SpinnerSize  } from '@fluentui/react';
import useWindowSize from "../../utils/useWindowSize";



// content
import twitchLogo from '../../assets/TwitchExtrudedWordmarkPurple.svg'

// styles
import './Twitch.scss'

// interfaces
import { ITwitchBroadcaster } from '../../interfaces/ITwitchBroadcaster';

function Twitch() {
   // const appInsights = useAppInsightsContext();
   // const trackOnMouseEnter = useTrackMetric(appInsights, "Twitch - onMouseEnter");
   // const trackFetchLoading = useTrackEvent(appInsights, "Twitch - fetch Loading time", {twitchLoadingtime: new Date().getTime()}, false);

   const [loading, setLoading] = React.useState(false);
   const [data, setData] = React.useState<ITwitchBroadcaster[]>([]);

   React.useEffect(() => {
     
      const fetchTwitch = async () => {
         setLoading(true);

         const cacheFilteredData = getKey("twitch");
         if (cacheFilteredData && cacheFilteredData !== null) {
            setData(JSON.parse(cacheFilteredData));
         }
         else {
            const response: ITwitchBroadcaster[] = await getAzureTableEntities(constants.azureAccount, "twitchBroadcaster");
            setKey("twitch", JSON.stringify(response));
            setData(response);
         }

         setLoading(false);

         // trackFetchLoading({twitchLoadingtime: new Date().getTime()})

      }
      fetchTwitch();
   
      return () => {
      // returned function will be called on component unmount    
      }
   }, []);
   
   const { width } = useWindowSize();

   const getTwitchDividerClass = () => {
      if(width > 993) {
         return "twitchDividerDesktop"
      }
      return "twitchDividerMobile"
   }

   return (
      <div className="d-flex flex-column mt-5" >

         <div className={"twitchDividerTop " + getTwitchDividerClass()}></div>
         <div className="twitchWrapper">

            <div className="container mt-5 mb-5 ">
               
               <img src={twitchLogo} alt="Twitch Logo" className="twitchLogo mb-4" />

               <div className="text-center text-dark font-weight-bold">
                  <p>Unsere Streamer. schaut doch mal vorbei!</p>
               </div>
               <div className="row m-1 justify-content-center border border-secondary border-fix rounded bg-dark">
                  {loading && <div className="p-5"><Spinner label="Loading..." size={SpinnerSize.large}/> </div> }
                  {data.map(ele => <TwitchItem key={uuidv4()} data={ele} />)}
               </div>
            </div>
         </div>
         <div className={"twitchDividerBottom " + getTwitchDividerClass()}></div>
      </div>
   )
}

export default Twitch;