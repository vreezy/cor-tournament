import { ApplicationInsights } from '@microsoft/applicationinsights-web'

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';


const appInsights = new ApplicationInsights({ config: {
   instrumentationKey: '894f90eb-210b-4fc6-9a2a-fdb43901747d'
   /* ...Other Configuration Options... */
 } });
 appInsights.loadAppInsights();
 appInsights.trackPageView(); // Manually call trackPageView to establish the current user/session/pageview


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
