import React from 'react';
import {
   BrowserRouter as Router,
   Switch,
   Route,
} from "react-router-dom";


// Content
import content from './content';
// Components
import Header from './components/Header/Header';
import Home from './components/Home/Home';

import Footer from './components/Footer/Footer';

import Impressum from './components/Impressum/Impressum';
import Contact from './components/Contact/Contact';
import DataProtection from './components/DataProtection/DataProtection';

// styles 
import { loadTheme } from '@fluentui/react';
import './App.scss';
// import colors  from '_colors.scss';

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
      neutralPrimary: '#ffffff',
      neutralDark: '#201f1e',
      black: '#1d1d1b',
      white: '#1d1d1b',
   }
}; 
 
loadTheme(darkTheme);

function App() {
     
   return (
      <div className="App h-100 bg-dark text-white">
         <Router>
            <Header content={content} />
               <Switch>
                  <Route exact path="/">
                     <Home content={content}/>
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
               </Switch>
            <Footer />
         </Router>
      </div>
   );
}

export default App;
