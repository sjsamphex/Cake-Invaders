import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PublicIcon from '@material-ui/icons/Public';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import GlobalScore from './GlobalScore';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '1rem',
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({ handleClick, isLoggedIn }) => {
  const classes = useStyles();
  // console.log(isLoggedIn)
  return (
    <div>
      <nav>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h4" className={classes.title}>
                Manhattan Trail
              </Typography>
              {isLoggedIn ? (
                <div>
                  <Button
                    startIcon={<SportsEsportsIcon />}
                    color="inherit"
                    component={Link}
                    to="/landing"
                  >
                    Game
                  </Button>
                  <Button
                    startIcon={<AccountCircleIcon />}
                    color="inherit"
                    component={Link}
                    to="/profile"
                  >
                    Profile
                  </Button>
                  <Button
                    startIcon={<PublicIcon />}
                    color="inherit"
                    component={Link}
                    to="/leadership"
                  >
                    Leadership
                  </Button>

                  <GlobalScore />

                  <a href="#" onClick={handleClick} tabIndex="-1">
                    <Button color="inherit">Logout</Button>
                  </a>

                </div>
              ) : (
                <div>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/signup">
                    Sign Up
                  </Button>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </div>
      </nav>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
