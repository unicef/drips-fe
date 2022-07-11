import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles } from '@material-ui/styles';
import { useHistory } from 'react-router';
import { makeStyles, AppBar, Toolbar, Box, Typography, IconButton, Link } from '@material-ui/core';
import horizontalLogo from '../assets/images/UNICEF_White_Horizontal.png';
import ezhactSmallLogo from '../assets/images/ezhact_logo_small.png';
import ErrorsSnackbar from './Errors-Snackbar';
import { selectUserName, selectPageName } from 'selectors/ui-flags';
import SuccessSnackbar from './Success-Snackbar';
import clsx from 'clsx';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import {DOCUMENTS} from 'lib/constants';

const useStyles = makeStyles(theme =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: theme.palette.primary.strong
    },
    toolbar: {
      minHeight: 112
    },
    iconBox: {
      width: 48,
      height: 48
    },
    iconBtn: {
      padding: 0
    },
    headerIcon: {
      fill: theme.palette.primary[400]
    },
    ezhactLogo: {
      verticalAlign: 'middle'
    },
    headerLogo: {
      width: '25%',
      height: '25%'
    },
    noPrint: {
      '@media print': {
        display: 'none'
      }
    },
    banner: {
      color: '#FFF',
      lineHeight: '1.25em',
      fontSize: '15px'
    },
    appTitle: {
      paddingLeft: '12px'
    },
    button: {
      color: 'white',
    },
    logo: {
      width: '55px',
      margin: '0 10px',
      display: 'flex',
      justifyContent: 'space-between'
    },
    link: {
      textDecoration: 'none',
      color: '#FFF',
      height: '20px',
      fontSize: '15px',
      margin: '30px',
      '&:hover': {
          textDecoration: 'none'
        }
    },
    rightPanel: {
      display: 'flex',
      paddingTop: '20px'
    }
  })
);

export const useNav = () => {
  const history = useHistory();

  const handleNav = page => () => {
      history.push(`/${page}`);
  };

  return { handleNav };
};

export default function AppToolbar() {
  const classes = useStyles();
  const userName = useSelector(selectUserName);
  const pageName = useSelector(selectPageName);
  const { handleNav } = useNav();
  function logout() {
    window.location.href = `/drips/security/unicef-logout/`;
  }

  function getHomeButton() {
    if (pageName === DOCUMENTS) {
      return  <IconButton aria-label="logout" className={clsx(classes.button)} onClick={handleNav('business_areas')}>
          <HomeIcon />
        </IconButton>
    }
    return '';
  }

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar className={classes.toolbar}>
        {getHomeButton()}
        <Box className={classes.logo}>
            <img src={ezhactSmallLogo} className={classes.ezhactLogo} />
        </Box>
        <Box width="100%">
          <Box width="100%" display="flex" justifyContent="space-between">
            <img src={horizontalLogo} className={classes.headerLogo} />
            <Box className={classes.rightPanel}>
              <Link className={classes.link} href='https://unicef.sharepoint.com/sites/DFAM-eZHACTTraining' target="_blank">
                  eZHACT SharePoint Site
              </Link>
              <IconButton aria-label="logout" className={classes.button} onClick={logout}>
                <ExitToAppIcon />
              </IconButton>
            </Box>
          </Box>
          <Box width="100%" display="flex" justifyContent="space-between">
            <Typography className={clsx(classes.appTitle, classes.banner)}>Document Repository of Implementing Partners Portal (DRIPS)</Typography>
            <Typography className={classes.banner}>{userName}</Typography>
          </Box>
        </Box>
      </Toolbar>
      <ErrorsSnackbar />
      <SuccessSnackbar />
    </AppBar>
  );
}
