import {
  all
} from 'redux-saga/effects';
import userSaga from './user';
import collectionsSaga from './collections';
import transitionsSaga from './route-transitions';
import searchReportsSaga from './search-reports';

export default function*() {
  yield all([userSaga(), collectionsSaga(), searchReportsSaga(), transitionsSaga()]);
}
