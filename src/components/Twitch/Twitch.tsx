import React from 'react';
// components
import TwitchItem from './TwitchItem';

// services
import { getTwitchItems } from '../../services/AzureService';

// helper
import { v4 as uuidv4 } from 'uuid';
import { Spinner, SpinnerSize  } from '@fluentui/react';
import useWindowSize from "../../utils/useWindowSize";

// interfaces
import { ITwitchItem } from '../../interfaces/ITwitchItem';

// content
import twitchLogo from '../../assets/TwitchExtrudedWordmarkPurple.svg'

// styles
import './Twitch.scss'

function Twitch() {

   const [loading, setLoading] = React.useState(false);
   const [data, setData] = React.useState<ITwitchItem[]>([]);

   React.useEffect(() => {
      const fetchUsers = async () => {
         setLoading(true);
         const response: any = await getTwitchItems();
         setData(response);
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