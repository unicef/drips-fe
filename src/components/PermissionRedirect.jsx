import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { UNICEF_USER_ROLE, DONOR_ADMIN_ROLE, DONOR_USER_ROLE } from '../lib/constants';
import { selectIsSuperUser} from 'selectors/ui-flags';

export const usePermissions = () => {
  const userGroup = UNICEF_USER_ROLE; //@dci useSelector(selectUserGroup);
  const isUnicefUser = userGroup === UNICEF_USER_ROLE;
  const isDonorAdmin = userGroup === DONOR_ADMIN_ROLE;
  const isDonorUser = userGroup === DONOR_USER_ROLE;
  const isSuperUser = useSelector(selectIsSuperUser);
  const canViewDonors = isUnicefUser || isSuperUser;
  return {
    isUnicefUser,
    isDonorAdmin,
    isSuperUser,
    isDonorUser,
    canViewDonors
  };
};

export default function PermissionRedirect() {
  const { canViewDonors } = usePermissions();

  if (canViewDonors) {
    return <Redirect to="/business_areas" />;
  } else {
    return <Redirect to="/landing" />;
  }
}
