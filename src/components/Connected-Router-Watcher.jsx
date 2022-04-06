// import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { equals } from 'ramda';
import { useLocation } from 'react-router';
import { onRouteChange } from 'slices/ui';
import { useEffect } from 'react';
import { selectPageName, selectBusinessAreaCode } from 'selectors/ui-flags';
import { usePermissions } from './PermissionRedirect';
import { initBusinessAreaList } from 'actions';

export default function ConnectedRouterWatcher({ children }) {
  const location = useLocation();
  const currentPageName = useSelector(selectPageName);
  const currentBusinessArea = useSelector(selectBusinessAreaCode);
  const businessAreas = useSelector(selectBusinessAreaCode);
  const { canViewDocuments } = usePermissions();
  const dispatch = useDispatch();

  useEffect(() => {
    if (canViewDocuments && !businessAreas.length) {
      dispatch(initBusinessAreaList());
    }
  }, [canViewDocuments]);

  useEffect(() => {
    // only dispatch if actual route changed, children change will trigger re-render of this component
    const route = location.pathname.split('/').filter(Boolean);
    const [page, businessArea] = route;
    if (route.length && (!equals(currentPageName, page) || !equals(currentBusinessArea, businessArea))) {
      dispatch(onRouteChange({ page, businessArea: businessArea || null }));
    }
  });

  return children;
}
