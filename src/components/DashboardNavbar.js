import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from './Logo';
import { useDispatch, useSelector } from "react-redux";

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);
  const dispatch = useDispatch();
  const handleExit = () => {
    console.log("exit")
    dispatch({type: 'LOGOUT'})
  }


  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <Link to="/">
          <Typography style={{ color: 'white' }}>
            {/* <Logo/> */}
            Batibo Admin Dashboard
          </Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          {/* <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
        <Link to="/login">
          <IconButton onClick={handleExit} color="inherit" style={{ color: 'white' }}>
            <InputIcon/>
          </IconButton>
        </Link>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
