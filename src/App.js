import './App.css';
import React, { useEffect, useState } from "react";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme'

import NavbarHeader from './components/NavbarHeader';
import TapPane from './components/NavbarTapPane';
import Carousel from './components/Carousel';


function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/search/movie?api_key=c0e5df18362201b9b43ffceb1bb5d318&query=Transformer")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.results);
          console.log("Function My Component: The following is result");
          console.log(items);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
    <div>
      <div>Loading...</div>
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>);
  } else {
    console.log("render gallery: The following is the results");
    console.log(items);
    return (
      <ul>
        {Object.keys(items).map((item,i) => (
          <li key={i}>
            {items[item].id}
            {items[item].title}
          </li>
        ))}
      </ul>
    );
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NavbarHeader />
        <Carousel />
        <div>
          {MyComponent()}
        </div>
        <TapPane />
      </div>
    </ThemeProvider>
  );
}

export default App;
