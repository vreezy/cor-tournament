import React from 'react';
import { getTwitchStatus } from '../../services/AzureService';
import { ITwitchItem } from '../../interfaces/ITwitchItem';
import TwitchItem from './TwitchItem';

function Twitch() {

   const [loading, setLoading] = React.useState(false);
   const [data, setData] = React.useState<ITwitchItem[]>([]);

  React.useEffect(() => {
     const fetchUsers = async () => {
        setLoading(true);
        const response: any = await getTwitchStatus();
        setData(response);
        setLoading(false);

     }
     fetchUsers();
  
     return () => {
     // returned function will be called on component unmount    
     }
  }, [])

  if(loading) {
   return (
      <div>
         Loading...
      </div>
   )
}

  return (
   <div className="container">
      <h2>Twitch</h2>
      <div className="row">
        {data.map(ele => <TwitchItem data={ele} />)}
      </div>
   </div>
  )


}

export default Twitch;