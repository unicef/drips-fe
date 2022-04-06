import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { makeStyles, createStyles, Box } from '@material-ui/core';
import AppToolbar from './App-Bar';
import { DRAWER_WIDTH, SEARCH_DOCUMENTS } from '../lib/constants';
import BusinessAreaList from 'pages/business-area';
import ContentHeader from './Content-Header';
import SearchPage from 'pages/documents/search';
import PrivacyPolicy from 'pages/privacy-policy';
import {
  ProtectedRouteBusinessAreaList,
  ProtectedRouteReportPage,
  UnassignedUser
} from '../pages/Authorized';

import PermissionRedirect from './PermissionRedirect';
import NotFound from './404';
import NoRole from './No-Role';
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'
import { selectConfig } from 'selectors/collections';
import { useSelector } from 'react-redux';
import { selectUserProfile } from 'selectors/ui-flags';

export const useMainStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex'
    },
    drawer: {
      width: DRAWER_WIDTH,
      flexShrink: 0
    },
    drawerPaper: {
      width: DRAWER_WIDTH
    },
    drawerHeader: {
      padding: theme.spacing(1)
    },
    toolbar: {
      ...theme.mixins.toolbar,
      minHeight: 64,
      height: 112
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default
    },
    contentWrapper: {
      padding: theme.spacing(3)
    },
    title: {
      fontSize: 16,
      fontWeight: 600,
      padding: theme.spacing(1),
      lineHeight: '1.2em',
      textTransform: 'uppercase'
    },
    divider: {
      borderRight: `1px solid ${theme.palette.common.white}`,
      padding: theme.spacing(2)
    },
    logo: {
      maxHeight: '100%',
      maxWidth: 77
    }
  })
);

export default function MainAppBar() {
  const classes = useMainStyles();
  const config = useSelector(selectConfig);
  const profile = useSelector(selectUserProfile);
  const instance = createInstance({
    urlBase: config.tracker.site_tracker,
    siteId: config.tracker.site_id || 6,
    userId: profile.email,
    disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
    heartBeat: { // optional, enabled by default
      active: true, // optional, default value: true
      seconds: 10 // optional, default value: `15
    },
    linkTracking: true
  })

  return (
    <MatomoProvider value={instance}>
      <div className={classes.root}>
        <AppToolbar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <ContentHeader />

          <div className={classes.contentWrapper}>
            <Box flexDirection="column">
              <Switch>
                <Route exact path="/no-role" component={NoRole} />
                <UnassignedUser path="*">
                  <Switch>
                    <Route exact path="/privacy-policy" component={PrivacyPolicy} />

                    <Route exact path="/" component={PermissionRedirect} />

                    <ProtectedRouteBusinessAreaList exact path="/business_areas">
                      <BusinessAreaList />
                    </ProtectedRouteBusinessAreaList>

                    <ProtectedRouteReportPage exact path={`/${SEARCH_DOCUMENTS}/:donorId?`}>
                      <SearchPage />
                    </ProtectedRouteReportPage>

                    <Route path="*" component={NotFound} />
                  </Switch>
                </UnassignedUser>
              </Switch>
            </Box>
          </div>
        </main>
      </div>
    </MatomoProvider>
  );
}
