import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Loader from './Loader';
import { onFetchUserProfile } from 'actions';
import { selectLoading, selectUserProfile } from 'selectors/ui-flags';

export default function LoginAuthWrapper({ children }) {
  const dispatch = useDispatch();
  const userProfile = useSelector(selectUserProfile);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(onFetchUserProfile());
  }, []);

  return (
    <>
      <Loader loading={loading} fullscreen />
      {userProfile ? children : null}
    </>
  );
}

LoginAuthWrapper.propTypes = {
  children: PropTypes.node.isRequired
};
