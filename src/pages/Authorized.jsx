import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import { usePermissions } from 'components/PermissionRedirect';
import { selectUserProfile } from 'selectors/ui-flags';
import {DOCUMENTS_PATH} from 'lib/constants';

export function UnassignedUser({ children, ...rest }) {
  const profile = useSelector(selectUserProfile);

  return (
    <Route {...rest} render={() => profile ? children : <Redirect to="/landing" /> } />
  )
}

export function ProtectedRouteBusinessAreaList({ children, ...rest }) {
  return (
    <Route {...rest} render={() => children } />
  );
}

export function ProtectedRouteReportPage({ children, ...rest }) {
  const { canViewDonors } = usePermissions();

  return (
    <Route
      {...rest}
      render={({ match }) => {
        const { donorId } = match.params;
        const { path } = match;
        const docPath = path.includes(DOCUMENTS_PATH);
        const unassignedDocAttempt = !docPath || Boolean(!canViewDonors) || !donorId;
        return unassignedDocAttempt ? <Redirect to="/not-found" /> : children;
      }}
    />
  );
}

const ProtectedRouteProps = {
  children: PropTypes.node.isRequired
};

UnassignedUser.propTypes = ProtectedRouteProps;
ProtectedRouteBusinessAreaList.propTypes = ProtectedRouteProps;
ProtectedRouteReportPage.propTypes = ProtectedRouteProps;
