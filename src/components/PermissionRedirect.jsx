import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { selectUserProfile} from 'selectors/ui-flags';

export const usePermissions = () => {
  const canViewDocument = Boolean(useSelector(selectUserProfile));
  return {
    canViewDocuments: canViewDocument
  };
};

export default function PermissionRedirect() {
  const { canViewDocuments } = usePermissions();

  if (canViewDocuments) {
    return <Redirect to="/business_areas" />;
  } else {
    return <Redirect to="/landing" />;
  }
}
