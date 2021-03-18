import React from 'react';
import logo from './logo_300.png';
import './App.scss';
import { loadTheme } from '@fluentui/react';

// Components
import Overview from './components/Overview/Overview';
import OverviewCard from './components/OverviewCard/OverviewCard';

const lightTheme = {
   palette: {
      themePrimary: '#52c3ee',
      themeLighterAlt: '#f8fcfe',
      themeLighter: '#e2f5fc',
      themeLight: '#c8ecfa',
      themeTertiary: '#94d9f4',
      themeSecondary: '#64c8ef',
      themeDarkAlt: '#49aed5',
      themeDark: '#3d93b4',
      themeDarker: '#2d6c85',
      neutralLighterAlt: '#faf9f8',
      neutralLighter: '#f3f2f1',
      neutralLight: '#edebe9',
      neutralQuaternaryAlt: '#e1dfdd',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c6c4',
      neutralTertiary: '#a19f9d',
      neutralSecondary: '#605e5c',
      neutralPrimaryAlt: '#3b3a39',
      neutralPrimary: '#323130',
      neutralDark: '#201f1e',
      black: '#000000',
      white: '#ffffff',
   }
};


const darkTheme = {
   palette: {
      themePrimary: '#52c3ee',
      themeLighterAlt: '#f8fcfe',
      themeLighter: '#e2f5fc',
      themeLight: '#c8ecfa',
      themeTertiary: '#94d9f4',
      themeSecondary: '#64c8ef',
      themeDarkAlt: '#49aed5',
      themeDark: '#3d93b4',
      themeDarker: '#2d6c85',
      neutralLighterAlt: '#faf9f8',
      neutralLighter: '#f3f2f1',
      neutralLight: '#edebe9',
      neutralQuaternaryAlt: '#e1dfdd',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c6c4',
      neutralTertiary: '#a19f9d',
      neutralSecondary: '#605e5c',
      neutralPrimaryAlt: '#3b3a39',
      neutralPrimary: '#323130',
      neutralDark: '#201f1e',
      black: '#ffffff',
      white: '#1d1d1b',
   }
}; 
 
loadTheme(darkTheme);

function App() {


   const overviewContent = ["Datum: xx.xx.xx", "Startzeit: xx.xx Uhr", "Format: 2on2 Random Teams", "System: KO-System (link!)"];
   const overviewRules = ["<a href='https://www.google.de'>Regeln Spieler</a>", "<a href='https://www.google.de'>Regeln Server</a>"];
      
   return (
      <div className="App" style={{backgroundColor: "#1d1d1b", color: "#ffffff"}}>
         <div className="container">


            <img src={logo} alt="Logo" className="mx-auto d-block"/>
            <br />
            <h1> &lt;&lt;Don't cry we are high&gt;&gt;-Turnier </h1>
            untertitel -&gt; cor only<br />
         </div>
         <div className="container">
            <div className="row">
                  <OverviewCard title="Übersicht" content={overviewContent}/>
                  
                  <OverviewCard title="Regeln" content={overviewRules}/>
            </div>
         </div>


         <div >
            <hr />
            
         </div>
         <br />
         <div className="container">

            Anmeldung
            Teilnehmer<br />

            Teams <br />

            twitch links<br />

            Turnier plan https://display.turnier.live/R1se/cor-test/0<br />
         </div>
      </div>
   );
}

export default App;
