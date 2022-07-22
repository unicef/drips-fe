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
// import {
//   selectCostCenter
// } from 'selectors/collections';
import {
  removeEmpties
} from 'lib/helpers';
import {
  fetchSearchReports, //fetchCostCenters
} from 'api/search-index';
import {
  setLoading
} from 'slices/ui';
import {
  onReceiveSearchReports
} from 'slices/search-reports';
// import {
//   onReceiveCostCenter
// } from 'slices/metadata';
import {
  setError
} from 'slices/error';
import {
  onFetchSearchReports
} from 'actions';
import {
  waitFor
} from './helpers';
import {
  SEARCH_DOCUMENTS, SOURCE_ID
} from '../lib/constants'

// autocomplete office needed
// function* getCostCenters(params) {
//   try {
//     let costCenters = yield call(fetchCostCenters, {business_area_code: params.business_area});
//     yield put(onReceiveCostCenter(costCenters));
//   } catch (err) {
//     put(setError(err));
//   }
// }

function* getSearchReports(params) {
  // autocomplete office needed
  // const costCenters = yield select(selectCostCenter);

  // if (!costCenters || !costCenters.length) {
  //   yield call(getCostCenters, params);
  // }

  let searchReports = {};
  searchReports = yield call(fetchSearchReports, params);
  return searchReports;
}

function* getSearchCallerFunc(payload) {
  const reportPageName = yield select(selectMenuBarPage);
  yield call(waitFor, selectBusinessAreaCode);
  const businessArea = yield select(selectBusinessAreaCode)
  let result = {
    params: {
      ...removeEmpties(payload)
    }
  };
  result.caller = getSearchReports;

  switch (reportPageName) {
    case SEARCH_DOCUMENTS: {
      result.params.business_area = businessArea;
      result.params.source_id = SOURCE_ID;
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
