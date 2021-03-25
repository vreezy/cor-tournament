import React from 'react';
// components
import TwitchItem from './TwitchItem';

// services
import { getTwitchItems } from '../../services/AzureService';
import { setKey, getKey } from '../../services/cacheService';


// helper
import { v4 as uuidv4 } from 'uuid';
import { Spinner, SpinnerSize  } from '@fluentui/react';
import useWindowSize from "../../utils/useWindowSize";

// interfaces
import { ITwitchStatus } from '../../interfaces/ITwitchStatus';
import { ITwitchItem } from '../../interfaces/ITwitchItem';

// content
import twitchLogo from '../../assets/TwitchExtrudedWordmarkPurple.svg'

// styles
import './Twitch.scss'

function Twitch() {

   const [loading, setLoading] = React.useState(false);
   const [data, setData] = React.useState<ITwitchItem[]>([]);





   React.useEffect(() => {
      const filterData = (data: ITwitchItem[], query: string[]) => {
         return data.filter((ele:ITwitchItem) => {
            return query.includes(ele.broadcaster_login)
         });   
      }
      
      const fetchUsers = async () => {
         setLoading(true);

         const cacheFilteredData = getKey("twitch");
         if (cacheFilteredData !== null) {
            setData(JSON.parse(cacheFilteredData));
         }
         else {
            const response: ITwitchStatus = await getTwitchItems();
            if (response && response.status && response.status === "ok" && response.hasOwnProperty("data") && response.hasOwnProperty("query")) {
               const filteredData = filterData(response.data, response.query);
               setKey("twitch", JSON.stringify(filteredData));
               setData(filteredData);
            }
         }



         setLoading(false);

      }
      fetchUsers();
   
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
      <div className="d-flex flex-column mt-5">

         <div className={"twitchDividerTop " + getTwitchDividerClass()}></div>
         <div className="twitchWrapper">

            <div className="container mt-5 mb-5 ">
               
               <img src={twitchLogo} alt="Twitch Logo" className="twitchLogo mb-4" />

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