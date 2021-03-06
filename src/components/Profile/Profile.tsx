// import { useEffect, useState } from "react";

// Msal imports
import { 
    MsalAuthenticationTemplate,
    //useMsal
} from "@azure/msal-react";
import { 
    //InteractionStatus,
    InteractionType
} from "@azure/msal-browser";
import { loginRequest } from "../../authConfig";

// Sample app imports

// import { Loading } from "../ui-components/Loading";
// import { ErrorComponent } from "../ui-components/ErrorComponent";
// import { callMsGraph } from "../utils/MsGraphApiCall";

// Material-ui imports


// const ProfileContent = () => {
//     const { inProgress } = useMsal();
//     const [graphData, setGraphData] = useState<any>(null);

//     useEffect(() => {
//         if (!graphData && inProgress === InteractionStatus.None) {
//             callMsGraph().then(response => setGraphData(response));
//         }
//     }, [inProgress, graphData]);
  
//     return (
//         <div>
//             { graphData ? <div><pre>{JSON.stringify(graphData, null, 2) }</pre></div> : null }
//         </div>
//     );
// };

export function Profile() {
    const authRequest = {
        ...loginRequest
    };

    return (
        <MsalAuthenticationTemplate 
            interactionType={InteractionType.Popup} 
            authenticationRequest={authRequest} 
            errorComponent={Error} 
            loadingComponent={Loading}
        >
            {/* <ProfileContent /> */}
        </MsalAuthenticationTemplate>
      )
};

export default Profile;

function Loading() {
    return (
        <span>Loading...</span>
    )
}

function Error() {
    console.log(arguments)
    return (
        <span>Error</span>
    )
}