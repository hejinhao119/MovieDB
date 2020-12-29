import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './ContentWrapper.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    paddingTop: '20px',
    paddingBottom: '20px',
    maxWidth: '1300px',
    minHeight: '388px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },


  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    paddingTop: '20px',
    // animation: '$fadein 1.3s linear forwards',
    // opacity: 1,
  },
  '@keyframes fadein': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },


  title: {
    color: '#2a2c32',
    fontSize: '1em',
    fontWeight: '600',
    whiteSpace: 'normal',
    display: 'block',
    overflowWrap: 'break-word',
    maxHeight: '74px',
  },
  titleBar: {
    height: '86px',
    width: '100%',
    position: 'relative',
    background: 'rgba(255,255,255,1)',
    display: 'flex',
    alignContent: 'flex-start',
    flexWrap: 'wrap'
  },
  contentHeader:{
    width: '100%',
    padding: '0px 40px',
    ['@media (max-width:768px)']: {
      padding: '0px 0px 0px 40px'
    },
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
  },
  contentHeaderh2:{
    margin: '0px 20px 0px 0px',
    whiteSpace: 'nowrap',
    fontSize: '1.5em',
    fontWeight: '600',
  },
  "@global": {
    ".MuiGridListTile-root": {
      marginLeft: '40px',
      width: '150px !important',
      minWidth: '150px',
      minHeight: '313px',
      ['@media (max-width:768px)']: {
        minHeight: '257px'
      },
      overflow: 'visible',
    },
    ".MuiGridListTile-tile": {
      width: '100%',
      height: '311px',
      minHeight: '311px',
      lineHeight: '311px',
      ['@media (max-width:768px)']: {
        height: '257px',
        minHeight: '257px',
      },
      overflow: 'hidden',
      position: 'relative',
    },
    ".MuiGridListTile-imgFullHeight": {
      left: '50%',
      height: '225px',
      maxHeight: '100%',
      ['@media (max-width:768px)']: {
        height: '186px',
      },
      borderRadius: '8px',
      verticalAlign: 'top',
      display: 'block',
      float: 'left',
    },
    ".MuiGridListTileBar-subtitle":{
      color: 'rgba(0,0,0,0.6)',
    },
    ".MuiBox-root":{
      display: 'block',
      position: 'absolute',
      lineHeight: '40px',
      ['@media (max-width:768px)']: {
        left: '11px',
      },
      
    },
    ".MuiTypography-caption":{
      lineHeight: '40px',
      fontSize: '0.6em',
      color: 'rgba(255,255,255,1)',
      ['@media (max-width:768px)']: {
        width: '50%',
      },
    },
    ".MuiCircularProgress-svg":{
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderRadius: '50%',
    }
  }
}));

function CircularProgressWithLabel(props) {
  const RatingColor = Number(props.value) >= 70 ? 'rgba(33,208,122,1)' : Number(props.value) >=40 ? 'rgba(206,209,49,1)' : 'rgba(209,49,49)';

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" style={{color: RatingColor}} {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="block"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

function ContenWrapper() {
  const classes = useStyles();
  const imageUrlPrefix = "https://image.tmdb.org/t/p/w500";
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [toggleText, setToggleText] = useState("This Week");
  const [apiURL, setApiURL] = useState("https://api.themoviedb.org/3/trending/movie/week?api_key=c0e5df18362201b9b43ffceb1bb5d318");

  // Delay change text because transition animation delay is 0.25s
  // Update api content when user click the switch button
  function ToggleFunction(text){
    const div = document.querySelector(".MuiGridList-root");
    div.classList.add("fadeInOut");
    setTimeout(() => {div.classList.remove("fadeInOut");}, 1300);

    setTimeout(() => setToggleText(text), 250);

    setTimeout(() => {
    if(text=="Today"){
      setApiURL("https://api.themoviedb.org/3/trending/movie/day?api_key=c0e5df18362201b9b43ffceb1bb5d318")
    };
    if(text=="This Week"){
      setApiURL("https://api.themoviedb.org/3/trending/movie/week?api_key=c0e5df18362201b9b43ffceb1bb5d318")
    };
    fetch(apiURL)
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
    },650);
  };

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(apiURL)
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
      <div className={classes.root}>
        <div className={classes.contentHeader}>
          <h2 className={classes.contentHeaderh2}> Trending </h2>

          <div class="container-toggle">
            <form class="toggle">
              <input type="radio" id="choice1" name="choice" value="creative" onClick={()=>ToggleFunction("Today")} />
              <label for="choice1">Today</label>
              <input type="radio" id="choice2" name="choice" value="productive" onClick={()=>ToggleFunction("This Week")} />
              <label for="choice2">This Week</label>
              <div id="flap"><span class="content">{toggleText}</span></div>
            </form>
          </div>

        </div>
        <GridList className={classes.gridList} cols={2.5}>
        {Object.keys(items).map((item,i) => (
          <GridListTile key={i} className={classes.GridListTileroot}>
            <img src={imageUrlPrefix+items[item].poster_path} alt={items[item].title} style={{maxHeight:'100%'}}/>
            <CircularProgressWithLabel value={items[item].vote_average*10} />
            <GridListTileBar
              title={items[item].title}
              subtitle={items[item].release_date}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
          </GridListTile>
        ))}
        </GridList>
      </div>
    );
  }
}

export default ContenWrapper;