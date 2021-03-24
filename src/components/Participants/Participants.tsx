import React from 'react';


// services
import { getUsers } from '../../services/AzureService';

// helper
import { v4 as uuidv4 } from 'uuid';
import { Spinner, SpinnerSize  } from '@fluentui/react';

function Participants() {


    const [loading, setLoading] = React.useState(false);
    const [users, setUsers] = React.useState<any[]>([]);

   React.useEffect(() => {
      const fetchUsers = async () => {
         setLoading(true);
         const response = await getUsers();
         setUsers(response);
         setLoading(false);

      }
      fetchUsers();
   
      return () => {
      // returned function will be called on component unmount    
      }
   }, [])

   return (
      <div className="container mt-4">
         <div className="row">
            <h2>Teilnehmer</h2>
         </div>
         
         <div className="row align-items-center justify-content-center border rounded bg-secondary">
            {loading && <div className="col col-auto p-5"><Spinner label="Loading..." size={SpinnerSize.large}/> </div> }
            {users.map(user => <div key={uuidv4()} className="col col-auto p-2"><div className="badge badge-secondary font-weight-light bg-dark" style={{fontSize: "1.2rem"}}>{user.user}</div></div> )}
         </div>
      </div>         
   );

}

export default Participants;
