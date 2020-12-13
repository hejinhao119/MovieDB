import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import TheatersRoundedIcon from '@material-ui/icons/TheatersRounded';
import TvRoundedIcon from '@material-ui/icons/TvRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

const useStyles = makeStyles(theme => ({
    root: {
      width: 767,
      [theme.breakpoints.up('md')]: {
        display:"None",
      }
    },
  }));
  
function TapPane() {
    const classes = useStyles();
    const [value, setValue] = React.useState('recents');
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    
  
    return (
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
            <BottomNavigationAction label="Home" value="home" icon={<HomeRoundedIcon />} />
            <BottomNavigationAction label="Movies" value="movies" icon={<TheatersRoundedIcon />} />
            <BottomNavigationAction label="TV Shows" value="tv-shows" icon={<TvRoundedIcon />} />
            <BottomNavigationAction label="Account" value="account" icon={<AccountCircleRoundedIcon />} />
        </BottomNavigation>
    );
}

export default TapPane;