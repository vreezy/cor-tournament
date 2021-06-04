// import './wdyr'; // <--- first import

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

// import reportWebVitals from './reportWebVitals';

// msal
import { PublicClientApplication, EventType, EventMessage, AuthenticationResult } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";


export const msalInstance = new PublicClientApplication(msalConfig);

// Account selection logic is app dependent. Adjust as needed for different use cases.
// const accounts = msalInstance.getAllAccounts();
// if (accounts.length > 0) {
//     msalInstance.setActiveAccount(accounts[0]);
// }

msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        const payload = event.payload as AuthenticationResult;
        const account = payload.account;
        msalInstance.setActiveAccount(account);
    }
});

// import { ApplicationInsights } from '@microsoft/applicationinsights-web'

// const appInsights = new ApplicationInsights({ config: {
//    instrumentationKey: '271b080c-1fc2-4a1f-9d37-7454ee1e3884'
//    /* ...Other Configuration Options... */
// } });
// appInsights.loadAppInsights();
// appInsights.trackPageView();

ReactDOM.render(
  <React.StrictMode>
    <App pca={msalInstance} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
