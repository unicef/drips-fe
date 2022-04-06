import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import SearchReportsFilter from 'pages/documents/components/search-reports-filters-root';
import SearchReportsTable from 'components/table/search-reports-table';
import Footer from 'components/Footer';
import { selectPageName } from 'selectors/ui-flags';
import { initSearchReportsPage } from 'actions';
import { onReceiveSearchReports } from 'slices/search-reports';
import { SEARCH_DOCUMENTS } from 'lib/constants';

function useInitSearchReports(dispatch, businessArea) {
  return () => {
    dispatch(initSearchReportsPage(businessArea));
  };
}

function useDefaultHook() {
  return () => { };
}

const useInitPage = pageName => {
  const dispatch = useDispatch();
  const { businessArea } = useParams();

  switch (pageName) {
    case SEARCH_DOCUMENTS:
      return useInitSearchReports(dispatch, businessArea);
    default:
      return useDefaultHook;
  }
}

export default function SearchPage() {
  const pageName = useSelector(selectPageName);
  const dispatch = useDispatch();
  const effect = useInitPage(pageName);
  useEffect(effect, [pageName]);

  useEffect(() => {
    dispatch(onReceiveSearchReports([]));
  }, [pageName]);

  return (
    <>
      <SearchReportsFilter />
      <SearchReportsTable />
      <Footer />
    </>
  );
}
