import './App.css';
import React from "react";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme'

import NavbarHeader from './components/NavbarHeader';
import TapPane from './components/NavbarTapPane';
import Carousel from './components/Carousel';
import ContenWrapper from './components/ContentWrapper';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavbarHeader />
      <div className="App">
        <Carousel />
        
          {ContenWrapper()}
        
        <TapPane />
      </div>
    </ThemeProvider>
  );
}

export default App;
