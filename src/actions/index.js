import {
  createAction
} from 'redux-starter-kit';

export const initDonorsList = createAction('initDonorsList');
export const initBusinessAreaList = createAction('initBusinessAreaList');
export const onFetchUserProfile = createAction('onFetchUserProfile');
export const initDonorsFilter = createAction('initDonorsFilter');
export const redirectToLogin = createAction('redirectToLogin');
export const onFetchReports = createAction('onFetchReports');
export const initCertifiedReportsPage = createAction('initCertifiedReportsPage');
export const initSearchReportsPage = createAction('initSearchReportsPage');
export const onFetchSearchReports = createAction('onFetchSearchReports');
