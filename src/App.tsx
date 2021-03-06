import React from 'react';
import {
   Switch,
   Route,
   HashRouter
} from "react-router-dom";
import { initializeIcons } from '@fluentui/react';

// Content
import content from './content';
// Components
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import Home2 from './components/Home2/Home2';

import Footer from './components/Footer/Footer';

import Impressum from './components/Impressum/Impressum';
import Contact from './components/Contact/Contact';
import DataProtection from './components/DataProtection/DataProtection';



import Participants from './components/Participants/Participants';
import Teams from './components/Teams/Teams';
import Games from './components/Games/Games';

import Rules from './components/Rules/Rules';
import OverviewCard from './components/OverviewCard/OverviewCard';

import { IParticipant } from './interfaces/IParticipant';
import { ITeam } from './interfaces/ITeam';
import { IGame } from './interfaces/IGame';
import { IMap } from './interfaces/IMap';

// MSAL imports
import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import Profile from './components/Profile/Profile';
// import { CustomNavigationClient } from "./utils/NavigationClient";

// AppInsights
// import { AppInsightsContext } from "@microsoft/applicationinsights-react-js";
// import { reactPlugin } from "./utils/AppInsights";

// services
import { getAzureTableEntities } from './services/AzureService';


// constantes
import { constants } from './constants';

// styles 
import { loadTheme } from '@fluentui/react';
import './App.scss';
// import colors  from '_colors.scss';

const darkTheme = {
   palette: {
      themePrimary: '#52c3ee',
      themeLighterAlt: '#030809',
      themeLighter: '#0d1f26',
      themeLight: '#183a47',
      themeTertiary: '#30748e',
      themeSecondary: '#47aad1',
      themeDarkAlt: '#61c7ef',
      themeDark: '#78cff1',
      themeDarker: '#9adbf5',
      neutralLighterAlt: '#1b1b19',
      neutralLighter: '#1b1b19',
      neutralLight: '#1a1a18',
      neutralQuaternaryAlt: '#181816',
      neutralQuaternary: '#171715',
      neutralTertiaryAlt: '#161614',
      neutralTertiary: '#c8c8c8',
      neutralSecondary: '#d0d0d0',
      neutralPrimaryAlt: '#dadada',
      neutralPrimary: '#ffffff',
      neutralDark: '#f4f4f4',
      black: '#f8f8f8',
      white: '#282828',

      // themePrimary: '#52c3ee',
      // themeLighterAlt: '#f8fcfe',
      // themeLighter: '#e2f5fc',
      // themeLight: '#c8ecfa',
      // themeTertiary: '#94d9f4',
      // themeSecondary: '#64c8ef',
      // themeDarkAlt: '#49aed5',
      // themeDark: '#3d93b4',
      // themeDarker: '#2d6c85',
      // neutralLighterAlt: '#faf9f8',
      // neutralLighter: '#f3f2f1',
      // neutralLight: '#edebe9',
      // neutralQuaternaryAlt: '#e1dfdd',
      // neutralQuaternary: '#d0d0d0',
      // neutralTertiaryAlt: '#c8c6c4',
      // neutralTertiary: '#a19f9d',
      // neutralSecondary: '#605e5c',
      // neutralPrimaryAlt: '#3b3a39',
      // neutralPrimary: '#ffffff',
      // neutralDark: '#201f1e',
      // black: '#1d1d1b',
      // white: '#1d1d1b',
   }
}; 
 
type AppProps = {
   pca: IPublicClientApplication
};

interface IGlobalState {
   loading: boolean;
   setLoading(bool: boolean): void;
   isAdmin: boolean;
   setAdmin(bool: boolean): void;
   participants: IParticipant[];
   setParticipants(arr: IParticipant[]): void;
   teams: ITeam[];
   setTeams(arr: ITeam[]): void;
   games: IGame[];
   setGames(arr: IGame[]): void;
   maps: IMap[];
   setMaps(arr: IMap[]): void;
}


const globalState: IGlobalState = {
   loading: false,
   setLoading: (bool: boolean) => {},
   isAdmin: false,
   setAdmin: (bool: boolean) => {},
   participants: [],
   setParticipants: (arr: IParticipant[]) => {},
   teams: [],
   setTeams: (arr: ITeam[]) => {},
   games: [],
   setGames: (arr: IGame[]) => {},
   maps: [],
   setMaps: (arr: IMap[]) => {}
};
 
export const globalStateContext = React.createContext(globalState);


function App({ pca }: AppProps) {

   loadTheme(darkTheme);
   initializeIcons();

   const [loading, setLoading] = React.useState(false);
   const [isAdmin, setAdmin] = React.useState(false); 
   const [participants, setParticipants] = React.useState<IParticipant[]>([]);
   const [teams, setTeams] = React.useState<ITeam[]>([]);
   const [games, setGames] = React.useState<IGame[]>([]);
   const [maps, setMaps] = React.useState<IMap[]>([]);


   React.useEffect(() => {
      const fetchParticipants = async () => {
         setLoading(true);
         const promises: Promise<any>[] = [];
         // const participants: IParticipant[] = await getAzureTableEntities(constants.azureAccount, "user");
         promises.push(getAzureTableEntities(constants.azureAccount, "user"));
         promises.push(getAzureTableEntities(constants.azureAccount, "teams"));
         promises.push(getAzureTableEntities(constants.azureAccount, "games"));
         promises.push(getAzureTableEntities(constants.azureAccount, "maps"));
         const results = await Promise.all(promises);
         const participants: IParticipant[] = results[0];
         const teams: ITeam[] = results[1];
         const games: IGame[] = results[2]; // mockGames; // 
         const maps: IMap[] = results[3];

         setParticipants(participants);
         setTeams(teams);
         setGames(games);
         setMaps(maps);
         setLoading(false);
      }
      fetchParticipants();
   
      return () => {
      // returned function will be called on component unmount    
      }
   }, [setLoading, setParticipants, setTeams, setGames, setMaps]);

   return (
      // <AppInsightsContext.Provider value={reactPlugin}>
      <MsalProvider instance={pca}>
         <globalStateContext.Provider value={{isAdmin, setAdmin, loading, setLoading, participants, setParticipants, teams, setTeams, games, setGames, maps, setMaps}}>
         <div className="App h-100 bg-dark text-white">
            <HashRouter>
               <Navbar />
               <Header content={content} />
                  <Switch>
                     <Route exact path="/">
                        <div className="container mt-4">
                           <div className="row">
                              <OverviewCard title="WELCOME" content={<Home2 />}   />
                           </div>
                        </div>
                     </Route>
                     <Route path="/impressum">
                        <Impressum />
                     </Route>
                     <Route path="/dataprotection">
                        <DataProtection />
                     </Route>
                     <Route path="/contact">
                        <Contact />
                     </Route>
                     <Route path="/rules">
                        <div className="container mt-4">
                           <div className="row">
                              <OverviewCard title="Regeln" content={<Rules />}/>
                           </div>
                        </div>
                     </Route>

                     <Route path="/participants">
                        <Participants />
                     </Route>

                     <Route path="/teams">

                        <Teams />


                     </Route>
                     <Route path="/schedule">
                        <Games />
                     </Route>
                     <Route path="/profile">
                        <Profile />
                     </Route>

                     

                  </Switch>
               <Footer />
            </HashRouter>
         </div>
         </globalStateContext.Provider>
      </MsalProvider>
      // </AppInsightsContext.Provider>
   );
}

export default App;
