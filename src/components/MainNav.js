import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        width:'100%',
        position:'fixed',
        bottom:0,
        backgroundColor:'#2d313a!important',
        zIndex:100,
    },
});

export default function MainNav(props) {
    const [value, setValue] = useState(0);
    const classes = useStyles(props)
    const history = useHistory();
    useEffect(()=>{
        if(value === 0) history.push('/')
        else if (value === 1) history.push('/movies')
        else if (value === 2) history.push('/series')
        else if (value === 3) history.push('/search')
        else history.push('/')
    },[value, history])
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <BottomNavigation
            className={classes.root}
            value={value}
            onChange={handleChange}
            showLabels
        >
            <BottomNavigationAction
                label="Trending"
                style={{color:'white'}}
                icon={<WhatshotIcon />}
            />
            <BottomNavigationAction
                label="Movies"
                style={{color:'white'}}
                icon={<MovieIcon />}
            />
            <BottomNavigationAction
                label="TV Series"
                style={{color:'white'}}
                icon={<TvIcon />}
            />
            <BottomNavigationAction
                label="Search"
                style={{color:'white'}}
                icon={<SearchIcon />}
            />
        </BottomNavigation>
    );
}
