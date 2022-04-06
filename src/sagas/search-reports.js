import {
  takeLatest,
  call,
  put,
  all,
  select
} from 'redux-saga/effects';
import {
  selectError,
  selectMenuBarPage,
  selectBusinessAreaCode
} from 'selectors/ui-flags';
import {
  removeEmpties
} from 'lib/helpers';
import {
  fetchSearchReports,
} from 'api/search-index';
import {
  setLoading
} from 'slices/ui';
import {
  onReceiveSearchReports
} from 'slices/search-reports';
import {
  setError
} from 'slices/error';
import {
  onFetchSearchReports
} from 'actions';
import {
  SEARCH_DOCUMENTS
} from '../lib/constants'

function* getInitialSearchReports(params) {
  let result = {};
  try {
    result = yield call(
      fetchSearchReports, params
    )
  } catch (err) {
    yield put(setError(err));
  }
  return result;
}

function* getSearchReports(params) {
  const currentlyBACode = yield select(selectBusinessAreaCode);

  if (!currentlyBACode || currentlyBACode != params.businessArea) {
    searchReports = yield call(getInitialSearchReports, params);
    return searchReports;
  }

  let searchReports = {};
  searchReports = yield call(fetchSearchReports, params);
  return searchReports;
}

function* getSearchCallerFunc(payload) {
  const reportPageName = yield select(selectMenuBarPage);
  const businessArea = yield select(selectBusinessAreaCode);
  let result = {
    params: {
      ...removeEmpties(payload)
    }
  };
  result.caller = getSearchReports;

  switch (reportPageName) {
    case SEARCH_DOCUMENTS: {
      result.params.business_area = businessArea;
      break
    }
  }
  return result;
}

function* handleFetchSearchReports({
  payload
}) {
  try {
    yield put(setLoading(true));

    const {
      caller,
      params,
      arg
    } = yield call(getSearchCallerFunc, payload);

    const searchReports = yield call(caller, params, arg);
    yield put(onReceiveSearchReports(searchReports));
  } catch (err) {
    const existingError = yield select(selectError);
    if (!existingError) {
      yield put(setError(err));
    }
  } finally {
    yield put(setLoading(false));
  }
}

export default function*() {
  yield all([yield takeLatest(onFetchSearchReports.type, handleFetchSearchReports)]);
}
